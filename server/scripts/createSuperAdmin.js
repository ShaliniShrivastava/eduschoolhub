
require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { OAuth2Client } = require("google-auth-library");
const User = require("../models/User");

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

function getRequiredEnv(name) {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`${name} is missing from .env`);
  }

  return value;
}

async function verifyGoogleToken(idToken, authorizedEmail) {
  if (!idToken || typeof idToken !== "string") {
    throw new Error("A valid Google ID token is required for linking.");
  }

  const clientId = getRequiredEnv("GOOGLE_CLIENT_ID");

  const ticket = await googleClient.verifyIdToken({
    idToken,
    audience: clientId,
  });

  const payload = ticket.getPayload();

  if (
    !payload?.sub ||
    !payload.email ||
    payload.email_verified !== true
  ) {
    throw new Error("Google account is not verified.");
  }

  const googleEmail = payload.email.trim().toLowerCase();

  if (googleEmail !== authorizedEmail) {
    throw new Error(
      "Google email does not match SUPER_ADMIN_EMAIL."
    );
  }

  return {
    googleId: payload.sub,
    email: googleEmail,
  };
}

async function createSuperAdmin() {
  let exitCode = 0;

  try {
    const mongoUri = getRequiredEnv("MONGO_URI");
    const email = getRequiredEnv("SUPER_ADMIN_EMAIL").toLowerCase();
    const name =
      process.env.SUPER_ADMIN_NAME?.trim() ||
      "EduSchoolHub Super Admin";

    await mongoose.connect(mongoUri);
    console.log("MongoDB connected.");

    let admin = await User.findOne({ email });

    if (admin && admin.role !== "superAdmin") {
      throw new Error(
        "This email belongs to a non-Super Admin account. No changes made."
      );
    }

    if (!admin) {
      const password = process.env.SUPER_ADMIN_PASSWORD;

      if (!password || password.length < 12) {
        throw new Error(
          "To create a new Super Admin, set SUPER_ADMIN_PASSWORD " +
          "to a password of at least 12 characters."
        );
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      admin = await User.create({
        name,
        email,
        password: hashedPassword,
        role: "superAdmin",
        schoolId: null,
        isActive: true,
      });

      console.log("Super Admin created successfully.");
    } else {
      console.log("Existing Super Admin found.");
    }

    // Google linking is optional. Without a token, no linking occurs.
    const googleIdToken = process.env.GOOGLE_LINK_ID_TOKEN;

    if (googleIdToken) {
      if (admin.isActive !== true) {
        throw new Error(
          "The Super Admin account is disabled. Google linking refused."
        );
      }

      const identity = await verifyGoogleToken(
        googleIdToken,
        email
      );

      if (admin.googleId && admin.googleId !== identity.googleId) {
        throw new Error(
          "This Super Admin is already linked to another Google account."
        );
      }

      const anotherUser = await User.findOne({
        googleId: identity.googleId,
        _id: { $ne: admin._id },
      });

      if (anotherUser) {
        throw new Error(
          "This Google account is already linked to another user."
        );
      }

      if (admin.googleId !== identity.googleId) {
        admin.googleId = identity.googleId;
        await admin.save();
        console.log("Google account linked successfully.");
      } else {
        console.log("This Google account is already linked.");
      }
    } else {
      console.log(
        "No Google linking token provided; linking was skipped."
      );
    }
  } catch (error) {
    exitCode = 1;
    console.error("Super Admin setup failed:", error.message);
  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }

    process.exitCode = exitCode;
  }
}

createSuperAdmin();
