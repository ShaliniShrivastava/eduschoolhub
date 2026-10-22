
const mongoose = require("mongoose");

const demoRequestSchema = new mongoose.Schema(
  {
    schoolName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },
    contactName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
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
    studentCount: {
      type: Number,
      required: true,
      min: 1,
    },
    preferredDate: {
      type: Date,
      default: null,
    },
    preferredTime: {
      type: String,
      default: "",
      trim: true,
    },
    message: {
      type: String,
      default: "",
      trim: true,
      maxlength: 1000,
    },
    status: {
      type: String,
      enum: ["pending", "contacted", "scheduled", "completed", "cancelled"],
      default: "pending",
    },
    scheduledAt: {
      type: Date,
      default: null,
    },
    adminNotes: {
      type: String,
      default: "",
      maxlength: 2000,
    },
    emailNotificationSent: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.DemoRequest ||
  mongoose.model("DemoRequest", demoRequestSchema);
