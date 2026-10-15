const mongoose = require("mongoose");

const changePasswordSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    otpHash: {
      type: String,
      required: true,
      select: false,
    },

    otpExpiry: {
      type: Date,
      required: true,
    },

    otpAttempts: {
      type: Number,
      default: 0,
      min: 0,
    },

    resetTokenHash: {
      type: String,
      select: false,
    },

    resetTokenExpiry: {
      type: Date,
    },

    isUsed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

changePasswordSchema.index(
  { userId: 1, isUsed: 1 },
  { name: "user_password_reset_status" }
);

module.exports = mongoose.model("ChangePassword", changePasswordSchema);