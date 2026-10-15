
require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

function getRequiredEnv(name) {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`${name} is missing from server/.env`);
  }

  return value;
}

function validatePassword(password) {
  const errors = [];

  if (password.length < 8) {
    errors.push("at least 8 characters");
  }

  if (!/[A-Z]/.test(password)) {
    errors.push("at least one uppercase letter (A-Z)");
  }

  if (!/[a-z]/.test(password)) {
    errors.push("at least one lowercase letter (a-z)");
  }

  if (!/[0-9]/.test(password)) {
    errors.push("at least one number (0-9)");
  }

  if (!/[^A-Za-z0-9]/.test(password)) {
    errors.push("at least one special character");
  }

  if (errors.length > 0) {
    throw new Error(
      `SUPER_ADMIN_PASSWORD must contain ${errors.join(", ")}.`
    );
  }
}

async function createSuperAdmin() {
  try {
    const mongoUri = getRequiredEnv("MONGO_URI");
    const email = getRequiredEnv("SUPER_ADMIN_EMAIL").toLowerCase();
    const password = getRequiredEnv("SUPER_ADMIN_PASSWORD");
    const name =
      process.env.SUPER_ADMIN_NAME?.trim() ||
      "EduSchoolHub Super Admin";

    const allowMultiple = process.argv.includes("--allow-multiple");

    // Validate password before connecting to the database.
    validatePassword(password);

    await mongoose.connect(mongoUri);
    console.log("MongoDB connected.");

    // Prevent duplicate accounts for the same email.
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      if (existingUser.role !== "superAdmin") {
        throw new Error(
          "This email belongs to another role. No changes made."
        );
      }

      console.log(
        "This Super Admin already exists. No duplicate created."
      );
      return;
    }

    // Count existing Super Admin accounts.
    const superAdminCount = await User.countDocuments({
      role: "superAdmin",
    });

    // Allow only one Super Admin unless explicitly overridden.
    if (superAdminCount >= 1 && !allowMultiple) {
      throw new Error(
        "A Super Admin already exists. To create another one, " +
          "rerun with the --allow-multiple flag."
      );
    }

    // Hash password before saving it.
    const hashedPassword = await bcrypt.hash(password, 12);

    await User.create({
  name,
  email,
  password: hashedPassword,
  googleId: null,
  role: "superAdmin",
  schoolId: null,
  isActive: true,
});

    console.log("Super Admin created successfully.");
    console.log(`Email: ${email}`);
    console.log(`Total Super Admins: ${superAdminCount + 1}`);
  } catch (error) {
    console.error("Super Admin setup failed:", error.message);
    process.exitCode = 1;
  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
  }
}

createSuperAdmin();
