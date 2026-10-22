const ContactMessage = require("../models/ContactMessage");
const { sendEmail } = require("../services/emailService");

const allowedRoles = [
  "School Owner",
  "Principal",
  "School Administrator",
  "Teacher",
  "Other",
];

const allowedStudentCounts = [
  "Under 200",
  "200-500",
  "501-1000",
  "1001-2000",
  "Above 2000",
];

const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (char) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[char];
  });

async function submitContactEnquiry(req, res) {
  try {
    const {
      fullName,
      schoolName,
      email,
      phone,
      role,
      studentCount,
      message,
    } = req.body || {};

    // Validate required fields.
    const fields = {
      fullName,
      schoolName,
      email,
      phone,
      role,
      studentCount,
      message,
    };

    for (const [field, value] of Object.entries(fields)) {
      if (typeof value !== "string" || !value.trim()) {
        return res.status(400).json({
          success: false,
          message: `${field} is required.`,
        });
      }
    }

    const cleanData = {
      fullName: fullName.trim(),
      schoolName: schoolName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      role: role.trim(),
      studentCount: studentCount.trim(),
      message: message.trim(),
    };

    if (
      cleanData.fullName.length > 100 ||
      cleanData.schoolName.length > 150 ||
      cleanData.email.length > 254 ||
      cleanData.phone.length > 20 ||
      cleanData.message.length > 3000
    ) {
      return res.status(400).json({
        success: false,
        message: "One or more fields exceed the allowed length.",
      });
    }

    if (!isValidEmail(cleanData.email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address.",
      });
    }

    if (!/^[0-9+\-()\s]{7,20}$/.test(cleanData.phone)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid phone number.",
      });
    }

    if (!allowedRoles.includes(cleanData.role)) {
      return res.status(400).json({
        success: false,
        message: "Please select a valid role.",
      });
    }

    if (!allowedStudentCounts.includes(cleanData.studentCount)) {
      return res.status(400).json({
        success: false,
        message: "Please select a valid student count.",
      });
    }

    // Save the enquiry before attempting email delivery.
    const enquiry = await ContactMessage.create(cleanData);

    // Email failure must not undo the saved enquiry.
   const receiverEmail = process.env.SUPER_ADMIN_EMAIL;

    if (receiverEmail) {
      try {
        const safe = Object.fromEntries(
          Object.entries(cleanData).map(([key, value]) => [
            key,
            escapeHtml(value),
          ])
        );

        await sendEmail({
          to: receiverEmail,
          subject: `New EduSchoolHub Enquiry - ${cleanData.schoolName}`,
          text: [
            "A new contact enquiry was submitted.",
            `Name: ${cleanData.fullName}`,
            `School: ${cleanData.schoolName}`,
            `Email: ${cleanData.email}`,
            `Phone: ${cleanData.phone}`,
            `Role: ${cleanData.role}`,
            `Student Count: ${cleanData.studentCount}`,
            `Message: ${cleanData.message}`,
          ].join("\n"),
          html: `
            <h2>New EduSchoolHub Contact Enquiry</h2>
            <p><strong>Name:</strong> ${safe.fullName}</p>
            <p><strong>School:</strong> ${safe.schoolName}</p>
            <p><strong>Email:</strong> ${safe.email}</p>
            <p><strong>Phone:</strong> ${safe.phone}</p>
            <p><strong>Role:</strong> ${safe.role}</p>
            <p><strong>Student Count:</strong> ${safe.studentCount}</p>
            <p><strong>Message:</strong><br>${safe.message.replace(/\n/g, "<br>")}</p>
          `,
        });
      } catch (emailError) {
        console.error("Contact enquiry email failed:", emailError.message);
      }
    } else {
      console.warn(
        "CONTACT_RECEIVER_EMAIL is not configured; enquiry saved without email notification."
      );
    }

    return res.status(201).json({
      success: true,
      message: "Thank you! Your enquiry has been submitted successfully.",
      enquiryId: enquiry._id,
    });
  } catch (error) {
    console.error("Contact enquiry submission failed:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to submit your enquiry right now. Please try again later.",
    });
  }
}

module.exports = {
  submitContactEnquiry,
};