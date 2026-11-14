
const ContactMessage = require("../../models/mainWebsite/ContactMessage");
const { sendEmail } = require("../../services/emailService");

const allowedRoles = [
  "School Owner",
  "Principal",
  "School Administrator",
  "Teacher",
  "Other",
];

const allowedStudentCounts = [
  "Under 200",
  "200–500",
  "501–1000",
  "1001–2000",
  "Above 2000",
];

const allowedPlans = ["", "Starter", "Professional", "Enterprise"];
const allowedBillingCycles = ["monthly", "yearly", "custom"];

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

// Logged-in users can submit enquiries. Super Admin cannot submit enquiries.
const submitContactEnquiry = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    if (req.user.role === "superAdmin") {
      return res.status(403).json({
        success: false,
        message: "Super Admin cannot submit contact enquiries.",
      });
    }

    const {
      fullName,
      schoolName,
      email,
      phone,
      role,
      studentCount,
      interestedPlan = "",
      billingCycle,
      message,
    } = req.body || {};

    const fields = {
      fullName,
      schoolName,
      email,
      phone,
      role,
      studentCount,
      billingCycle,
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

    if (typeof interestedPlan !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid interested plan.",
      });
    }

    const cleanData = {
      fullName: fullName.trim(),
      schoolName: schoolName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      role: role.trim(),
      studentCount: studentCount.trim(),
      interestedPlan: interestedPlan.trim(),
      billingCycle: billingCycle.trim(),
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

    if (!allowedPlans.includes(cleanData.interestedPlan)) {
      return res.status(400).json({
        success: false,
        message: "Please select a valid plan.",
      });
    }

    if (!allowedBillingCycles.includes(cleanData.billingCycle)) {
      return res.status(400).json({
        success: false,
        message: "Please select a valid billing preference.",
      });
    }

    // Save enquiry with logged-in user's ID.
    const enquiry = await ContactMessage.create({
      ...cleanData,
      userId: req.user._id,
    });

    // Send email notification to Super Admin.
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
            `Interested Plan: ${cleanData.interestedPlan || "Not selected"}`,
            `Billing Cycle: ${cleanData.billingCycle}`,
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
            <p><strong>Interested Plan:</strong> ${safe.interestedPlan || "Not selected"}</p>
            <p><strong>Billing Cycle:</strong> ${safe.billingCycle}</p>
            <p><strong>Message:</strong><br>${safe.message.replace(/\n/g, "<br>")}</p>
          `,
        });
      } catch (emailError) {
        console.error(
          "Contact enquiry email failed:",
          emailError.message
        );
      }
    } else {
      console.warn(
        "SUPER_ADMIN_EMAIL is not configured; enquiry saved without email notification."
      );
    }

    return res.status(201).json({
      success: true,
      message: "Thank you! Your enquiry has been submitted successfully.",
      enquiryId: enquiry._id,
    });
  } catch (error) {
    console.error(
      "Contact enquiry submission failed:",
      error.message
    );

    return res.status(500).json({
      success: false,
      message: "Unable to submit your enquiry right now. Please try again later.",
    });
  }
};

// Super Admin: Get all contact enquiries.
const getContactEnquiries = async (req, res) => {
  try {
    const enquiries = await ContactMessage.find()
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: enquiries.length,
      data: enquiries,
    });
  } catch (error) {
    console.error("Contact enquiries fetch failed:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch contact enquiries.",
    });
  }
};

// User: Get only their own contact enquiries.
const getMyContactEnquiries = async (req, res) => {
  try {
    const enquiries = await ContactMessage.find({
      userId: req.user._id,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: enquiries.length,
      data: enquiries,
    });
  } catch (error) {
    console.error("User contact enquiries fetch failed:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch your contact enquiries.",
    });
  }
};

// Get individual enquiry.
// Super Admin opening it automatically changes status to seen.
// User can only view their own enquiry.
const getContactEnquiryById = async (req, res) => {
  try {
    const enquiry = await ContactMessage.findById(req.params.id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "Contact enquiry not found.",
      });
    }

    const isSuperAdmin = req.user.role === "superAdmin";
    const isOwner =
      enquiry.userId.toString() === req.user._id.toString();

    if (!isSuperAdmin && !isOwner) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to view this enquiry.",
      });
    }

    if (isSuperAdmin && enquiry.status === "submitted") {
      enquiry.status = "seen";
      enquiry.seenAt = new Date();
      await enquiry.save();
    }

    return res.status(200).json({
      success: true,
      data: enquiry,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid contact enquiry ID.",
      });
    }

    console.error("Contact enquiry fetch failed:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch contact enquiry.",
    });
  }
};

// Super Admin: Delete contact enquiry.
const deleteContactEnquiry = async (req, res) => {
  try {
    const enquiry = await ContactMessage.findByIdAndDelete(
      req.params.id
    );

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "Contact enquiry not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Contact enquiry deleted successfully.",
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid contact enquiry ID.",
      });
    }

    console.error("Contact enquiry deletion failed:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to delete contact enquiry.",
    });
  }
};

module.exports = {
  submitContactEnquiry,
  getContactEnquiries,
  getMyContactEnquiries,
  getContactEnquiryById,
  deleteContactEnquiry,
};
