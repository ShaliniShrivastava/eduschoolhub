
const DemoRequest = require("../../models/mainWebsite/DemoRequest");
const { sendEmail } = require("../../services/emailService");

const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validStrengths = [
  "Below 200",
  "200-500",
  "500-1000",
  "1000-2000",
  "Above 2000",
];

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[char]);
}

// Submit Demo Request
async function createDemoRequest(req, res) {
  try {
    if (!req.user || req.user.role === "superAdmin") {
      return res.status(req.user ? 403 : 401).json({
        success: false,
        message: req.user
          ? "Super Admin cannot submit demo requests."
          : "Authentication required.",
      });
    }

    const {
      schoolName,
      contactName,
      contactPerson,
      email,
      phone,
      studentCount,
      studentStrength,
      role = "",
      preference = "Online",
      preferredDate,
      preferredTime = "",
      message = "",
    } = req.body;

    const finalContactName = contactName || contactPerson;
    const finalStudentCount = studentCount || studentStrength;

    if (
      !schoolName?.trim() ||
      !finalContactName?.trim() ||
      !email?.trim() ||
      !phone?.trim() ||
      !finalStudentCount?.trim()
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

    if (!validStrengths.includes(finalStudentCount.trim())) {
      return res.status(400).json({
        success: false,
        message: "Please select a valid student strength.",
      });
    }

    if (!["Online", "Offline"].includes(preference)) {
      return res.status(400).json({
        success: false,
        message: "Please select a valid demo preference.",
      });
    }

    if (
      typeof message !== "string" ||
      message.length > 1000 ||
      typeof preferredTime !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid message or preferred time.",
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

    // Save demo request with logged-in user's ID.
    const demoRequest = await DemoRequest.create({
      userId: req.user._id,
      schoolName: schoolName.trim(),
      contactName: finalContactName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      studentCount: finalStudentCount.trim(),
      role: role.trim(),
      preference,
      preferredDate: requestedDate,
      preferredTime: preferredTime.trim(),
      message: message.trim(),
      status: "pending",
    });

    let emailSent = false;

    // Send notification email to Super Admin.
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
          `Designation: ${demoRequest.role || "Not specified"}`,
          `Preference: ${demoRequest.preference}`,
          `Preferred date: ${
            demoRequest.preferredDate || "Not specified"
          }`,
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
          <p><b>Students:</b> ${escapeHtml(demoRequest.studentCount)}</p>
          <p><b>Designation:</b> ${escapeHtml(demoRequest.role || "Not specified")}</p>
          <p><b>Preference:</b> ${escapeHtml(demoRequest.preference)}</p>
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
      console.error(
        "Demo notification email failed:",
        emailError.message
      );
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

// Get All Demo Requests - Super Admin
async function getDemoRequests(req, res) {
  try {
    if (!req.user || req.user.role !== "superAdmin") {
      return res.status(req.user ? 403 : 401).json({
        success: false,
        message: "You do not have permission.",
      });
    }

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

// Get My Demo Requests - Logged-in User
async function getMyDemoRequests(req, res) {
  try {
    if (!req.user || req.user.role === "superAdmin") {
      return res.status(req.user ? 403 : 401).json({
        success: false,
        message: "You do not have permission.",
      });
    }

    const requests = await DemoRequest.find({
      userId: req.user._id,
    })
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      data: requests,
    });
  } catch (error) {
    console.error("Get my demo requests error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to load your demo requests.",
    });
  }
}

// Get Demo Request By ID
async function getDemoRequestById(req, res) {
  try {
    const request = await DemoRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Demo request not found.",
      });
    }

    const isSuperAdmin = req.user?.role === "superAdmin";
    const isOwner =
      request.userId &&
      request.userId.toString() === req.user?._id?.toString();

    if (!isSuperAdmin && !isOwner) {
      return res.status(req.user ? 403 : 401).json({
        success: false,
        message: "You do not have permission to view this request.",
      });
    }

    // Automatically mark as seen when Super Admin opens it.
    if (isSuperAdmin && request.status === "pending") {
      request.status = "seen";
      request.seenAt = new Date();
      await request.save();
    }

    return res.status(200).json({
      success: true,
      data: request,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid demo request ID.",
      });
    }

    console.error("Get demo request by ID error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to load demo request.",
    });
  }
}


// Update Demo Request - Super Admin
async function updateDemoRequest(req, res) {
  try {
    if (!req.user || req.user.role !== "superAdmin") {
      return res.status(req.user ? 403 : 401).json({
        success: false,
        message: "You do not have permission.",
      });
    }

    const { status, scheduledAt, adminNotes } = req.body;

    const allowedStatuses = [
      "pending",
      "seen",
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
      if (
        typeof adminNotes !== "string" ||
        adminNotes.length > 2000
      ) {
        return res.status(400).json({
          success: false,
          message: "Admin notes must be 2000 characters or fewer.",
        });
      }

      updates.adminNotes = adminNotes.trim();
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid fields provided for update.",
      });
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
      message: "Demo request updated successfully.",
      data: request,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid demo request ID.",
      });
    }

    console.error("Update demo request error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to update demo request.",
    });
  }
}

// Delete Demo Request - Super Admin
async function deleteDemoRequest(req, res) {
  try {
    if (!req.user || req.user.role !== "superAdmin") {
      return res.status(req.user ? 403 : 401).json({
        success: false,
        message: "You do not have permission.",
      });
    }

    const request = await DemoRequest.findByIdAndDelete(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Demo request not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Demo request deleted successfully.",
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid demo request ID.",
      });
    }

    console.error("Delete demo request error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to delete demo request.",
    });
  }
}

module.exports = {
  createDemoRequest,
  getDemoRequests,
  getMyDemoRequests,
  getDemoRequestById,
  updateDemoRequest,
  deleteDemoRequest,
};
