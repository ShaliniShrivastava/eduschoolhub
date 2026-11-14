const mongoose = require("mongoose");

const mainWebsiteContentSchema = new mongoose.Schema(
  {
    // Main Website page name
    page: {
      type: String,
      required: true,
      unique: true,
      enum: ["home", "about", "features", "modules", "pricing"],
      trim: true,
      lowercase: true,
    },

    // Content saved by Super Admin but not published
    draftContent: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },

    // Content currently visible on the public website
    publishedContent: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },

    // Super Admin who last updated the page
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    // Last successful publish date
    publishedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports =
  mongoose.models.MainWebsiteContent ||
  mongoose.model("MainWebsiteContent", mainWebsiteContentSchema);
