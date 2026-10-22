
const DemoRequest = require("../models/DemoRequest");
const { sendEmail } = require("../services/emailService");

const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function createDemoRequest(req, res) {
  try {
    const {
      schoolName,
      contactName,
      email,
      phone,
      studentCount,
      preferredDate,
      preferredTime,
      message,
    } = req.body;

    if (
      !schoolName?.trim() ||
      !contactName?.trim() ||
      !email?.trim() ||
      !phone?.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    if (!validEmail.test(email.trim())) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address.",
      });
    }

    const count = Number(studentCount);

    if (!Number.isInteger(count) || count < 1) {
      return res.status(400).json({
        success: false,
        message: "Student count must be at least 1.",
      });
    }

    let requestedDate = null;

    if (preferredDate) {
      requestedDate = new Date(preferredDate);

      if (Number.isNaN(requestedDate.getTime())) {
        return res.status(400).json({
          success: false,
          message: "Please select a valid preferred date.",
        });
      }
    }

    // Save first so an email failure does not lose the request.
    const demoRequest = await DemoRequest.create({
      schoolName: schoolName.trim(),
      contactName: contactName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      studentCount: count,
      preferredDate: requestedDate,
      preferredTime: preferredTime || "",
      message: message || "",
    });

    let emailSent = false;

    try {
      const adminEmail = process.env.SUPER_ADMIN_EMAIL;

      if (!adminEmail) {
        throw new Error("SUPER_ADMIN_EMAIL is not configured.");
      }

      await sendEmail({
        to: adminEmail,
        subject: `New EduSchoolHub demo request: ${demoRequest.schoolName}`,
        text: [
          "A new demo request has been received.",
          `School: ${demoRequest.schoolName}`,
          `Contact: ${demoRequest.contactName}`,
          `Email: ${demoRequest.email}`,
          `Phone: ${demoRequest.phone}`,
          `Students: ${demoRequest.studentCount}`,
          `Preferred date: ${demoRequest.preferredDate || "Not specified"}`,
          `Preferred time: ${demoRequest.preferredTime || "Not specified"}`,
          `Message: ${demoRequest.message || "None"}`,
          `Request ID: ${demoRequest._id}`,
        ].join("\n"),
        html: `
          <h2>New EduSchoolHub demo request</h2>
          <p><b>School:</b> ${escapeHtml(demoRequest.schoolName)}</p>
          <p><b>Contact:</b> ${escapeHtml(demoRequest.contactName)}</p>
          <p><b>Email:</b> ${escapeHtml(demoRequest.email)}</p>
          <p><b>Phone:</b> ${escapeHtml(demoRequest.phone)}</p>
          <p><b>Students:</b> ${demoRequest.studentCount}</p>
          <p><b>Preferred date:</b> ${
            demoRequest.preferredDate
              ? demoRequest.preferredDate.toISOString().slice(0, 10)
              : "Not specified"
          }</p>
          <p><b>Preferred time:</b> ${escapeHtml(demoRequest.preferredTime || "Not specified")}</p>
          <p><b>Message:</b> ${escapeHtml(demoRequest.message || "None")}</p>
          <p><b>Request ID:</b> ${demoRequest._id}</p>
        `,
      });

      emailSent = true;

      await DemoRequest.updateOne(
        { _id: demoRequest._id },
        { $set: { emailNotificationSent: true } }
      );
    } catch (emailError) {
      console.error("Demo notification email failed:", emailError.message);
    }

    return res.status(201).json({
      success: true,
      message: emailSent
        ? "Demo request submitted successfully."
        : "Demo request saved. Email notification could not be sent yet.",
      data: {
        id: demoRequest._id,
        emailNotificationSent: emailSent,
      },
    });
  } catch (error) {
    console.error("Create demo request error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to submit demo request.",
    });
  }
}

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[char]);
}

async function getDemoRequests(req, res) {
  try {
    const requests = await DemoRequest.find()
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      data: requests,
    });
  } catch (error) {
    console.error("Get demo requests error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to load demo requests.",
    });
  }
}

async function updateDemoRequest(req, res) {
  try {
    const { status, scheduledAt, adminNotes } = req.body;

    const allowedStatuses = [
      "pending",
      "contacted",
      "scheduled",
      "completed",
      "cancelled",
    ];

    const updates = {};

    if (status !== undefined) {
      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Invalid request status.",
        });
      }

      updates.status = status;
    }

    if (scheduledAt !== undefined) {
      if (scheduledAt === null || scheduledAt === "") {
        updates.scheduledAt = null;
      } else {
        const date = new Date(scheduledAt);

        if (Number.isNaN(date.getTime())) {
          return res.status(400).json({
            success: false,
            message: "Invalid scheduled date.",
          });
        }

        updates.scheduledAt = date;
      }
    }

    if (adminNotes !== undefined) {
      if (typeof adminNotes !== "string" || adminNotes.length > 2000) {
        return res.status(400).json({
          success: false,
          message: "Admin notes must be 2000 characters or fewer.",
        });
      }

      updates.adminNotes = adminNotes;
    }

    const request = await DemoRequest.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Demo request not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Demo request updated.",
      data: request,
    });
  } catch (error) {
    console.error("Update demo request error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to update demo request.",
    });
  }
}

module.exports = {
  createDemoRequest,
  getDemoRequests,
  updateDemoRequest,
};
