const User = require("../models/User");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const MAX_LOGIN_ATTEMPTS = 5;
const LOCK_TIME = 15 * 60 * 1000;

function normalizeEmail(email) {
  return typeof email === "string" ? email.trim().toLowerCase() : "";
}

function validatePassword(password) {
  const errors = [];

  if (typeof password !== "string" || password.length < 8) {
    errors.push("at least 8 characters");
  }

  if (typeof password !== "string" || !/[A-Z]/.test(password)) {
    errors.push("an uppercase letter");
  }

  if (typeof password !== "string" || !/[a-z]/.test(password)) {
    errors.push("a lowercase letter");
  }

  if (typeof password !== "string" || !/[0-9]/.test(password)) {
    errors.push("a number");
  }

  if (
    typeof password !== "string" ||
    !/[^A-Za-z0-9]/.test(password)
  ) {
    errors.push("a special character");
  }

  return errors;
}

function isAccountLocked(user) {
  return Boolean(user.lockUntil && user.lockUntil.getTime() > Date.now());
}

function clearExpiredLock(user) {
  if (user.lockUntil && user.lockUntil.getTime() <= Date.now()) {
    user.failedLoginAttempts = 0;
    user.lockUntil = null;
  }
}

async function verifyPassword(user, password) {
  clearExpiredLock(user);

  if (isAccountLocked(user)) {
    return {
      locked: true,
      valid: false,
      attemptsRemaining: 0,
    };
  }

  const valid = user.password
    ? await bcrypt.compare(password, user.password)
    : false;

  if (!valid) {
    user.failedLoginAttempts = (user.failedLoginAttempts || 0) + 1;

    if (user.failedLoginAttempts >= MAX_LOGIN_ATTEMPTS) {
      user.lockUntil = new Date(Date.now() + LOCK_TIME);
    }

    await user.save();

    return {
      locked: isAccountLocked(user),
      valid: false,
      attemptsRemaining: Math.max(
        0,
        MAX_LOGIN_ATTEMPTS - user.failedLoginAttempts
      ),
    };
  }

  user.failedLoginAttempts = 0;
  user.lockUntil = null;
  await user.save();

  return {
    locked: false,
    valid: true,
    attemptsRemaining: MAX_LOGIN_ATTEMPTS,
  };
}

async function authenticateWithPassword({
  email,
  password,
  role,
}) {
  const normalizedEmail = normalizeEmail(email);

  if (!normalizedEmail || typeof password !== "string" || !password) {
    return {
      success: false,
      status: 400,
      message: "Email and password are required.",
    };
  }

  const query = { email: normalizedEmail };

  if (role) {
    query.role = role;
  }

  const user = await User.findOne(query).select("+password");

  if (!user || !user.password) {
    return {
      success: false,
      status: 401,
      message: "Invalid email or password.",
    };
  }

  if (!user.isActive) {
    return {
      success: false,
      status: 403,
      message: "Account is inactive.",
    };
  }

  const verification = await verifyPassword(user, password);

  if (verification.locked) {
    return {
      success: false,
      status: 423,
      message: "Account locked. Please try again later.",
      attemptsRemaining: 0,
    };
  }

  if (!verification.valid) {
    return {
      success: false,
      status: 401,
      message: "Invalid email or password.",
      attemptsRemaining: verification.attemptsRemaining,
    };
  }

  return {
    success: true,
    user,
  };
}

function hashOtp(otp) {
  return crypto.createHash("sha256").update(otp).digest("hex");
}

function compareHashesSafely(storedHash, submittedHash) {
  if (
    typeof storedHash !== "string" ||
    typeof submittedHash !== "string"
  ) {
    return false;
  }

  const stored = Buffer.from(storedHash, "hex");
  const submitted = Buffer.from(submittedHash, "hex");

  return (
    stored.length === submitted.length &&
    stored.length > 0 &&
    crypto.timingSafeEqual(stored, submitted)
  );
}

async function hashPassword(password) {
  const errors = validatePassword(password);

  if (errors.length > 0) {
    const error = new Error(
      `Password must contain ${errors.join(", ")}.`
    );
    error.status = 400;
    throw error;
  }

  return bcrypt.hash(password, 12);
}

module.exports = {
  normalizeEmail,
  validatePassword,
  verifyPassword,
  authenticateWithPassword,
  hashOtp,
  compareHashesSafely,
  hashPassword,
};