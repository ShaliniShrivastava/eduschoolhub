
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: function () {
        return !this.googleId;
      },
      minlength: 8,
      select: false,
    },

    googleId: {
      type: String,
      default: null,
      trim: true,
    },

    role: {
      type: String,
      enum: ["superAdmin", "schoolAdmin", "staff", "student"],
      required: true,
    },

    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      default: null,
    },

    // Account security
    isActive: {
      type: Boolean,
      default: true,
    },

    isFirstLogin: {
      type: Boolean,
      default: true,
    },

    isProfileComplete: {
      type: Boolean,
      default: false,
    },

    failedLoginAttempts: {
      type: Number,
      default: 0,
      min: 0,
    },

    lockUntil: {
      type: Date,
      default: null,
    },

    // OTP security
    otpHash: {
      type: String,
      select: false,
    },

    otpExpiry: {
      type: Date,
      select: false,
    },

    otpAttempts: {
      type: Number,
      default: 0,
      min: 0,
      select: false,
    },

    // Password reset security
    resetTokenHash: {
      type: String,
      select: false,
    },

    resetTokenExpiry: {
      type: Date,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

// A Google account can be linked to only one user.
// Multiple null values are allowed for password-only accounts.
userSchema.index(
  { googleId: 1 },
  {
    unique: true,
    partialFilterExpression: {
      googleId: { $type: "string" },
    },
  }
);

module.exports = mongoose.model("User", userSchema);
