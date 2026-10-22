const mongoose = require("mongoose");

const contactMessageSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    schoolName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 254,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      maxlength: 20,
    },
    role: {
      type: String,
      required: true,
      enum: [
        "School Owner",
        "Principal",
        "School Administrator",
        "Teacher",
        "Other",
      ],
    },
    studentCount: {
      type: String,
      required: true,
      enum: [
        "Under 200",
        "200-500",
        "501-1000",
        "1001-2000",
        "Above 2000",
      ],
    },
    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 3000,
    },
    status: {
      type: String,
      enum: ["new", "in-progress", "resolved"],
      default: "new",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "ContactMessage",
  contactMessageSchema
);