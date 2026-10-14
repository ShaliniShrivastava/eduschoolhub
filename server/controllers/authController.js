
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { sendEmail } = require("../utils/email");
const {
  issueAccessCookie,
  clearAccessCookie,
} = require("../services/sessionService");

const MAX_ATTEMPTS = 5;
const LOCK_TIME = 15 * 60 * 1000;
const OTP_EXPIRY = 10 * 60 * 1000;
const OTP_MAX_ATTEMPTS = 5;

// Public user data — never return password or OTP hashes.
function publicUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    schoolId: user.schoolId,
    isFirstLogin: user.isFirstLogin,
    isProfileComplete: user.isProfileComplete,
  };
}

function isAccountLocked(user) {
  return Boolean(
    user.lockUntil && user.lockUntil.getTime() > Date.now()
  );
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
    return { locked: true, valid: false };
  }

  const valid = user.password
    ? await bcrypt.compare(password, user.password)
    : false;

  if (!valid) {
    user.failedLoginAttempts = (user.failedLoginAttempts || 0) + 1;

    if (user.failedLoginAttempts >= MAX_ATTEMPTS) {
      user.lockUntil = new Date(Date.now() + LOCK_TIME);
    }

    await user.save();

    return {
      locked: isAccountLocked(user),
      valid: false,
      attemptsRemaining: Math.max(
        0,
        MAX_ATTEMPTS - user.failedLoginAttempts
      ),
    };
  }

  user.failedLoginAttempts = 0;
  user.lockUntil = null;
  await user.save();

  return { locked: false, valid: true };
}

function sendInvalidCredentials(res) {
  return res.status(401).json({
    success: false,
    message: "Invalid email or password",
  });
}

// REGISTER SCHOOL ADMIN
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body || {};

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string" ||
      !name.trim() ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      role: "schoolAdmin",
    });

    return res.status(201).json({
      success: true,
      message: "School Admin registered successfully",
      user: publicUser(user),
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }

    console.error("Register error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// GENERAL LOGIN
const login = async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body || {};

    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({
      email: email.trim().toLowerCase(),
    }).select("+password");

    if (!user || !user.password) {
      return sendInvalidCredentials(res);
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "Account is inactive",
      });
    }

    const verification = await verifyPassword(user, password);

    if (verification.locked) {
      return res.status(423).json({
        success: false,
        message: "Account locked. Please try again later.",
      });
    }

    if (!verification.valid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
        attemptsRemaining: verification.attemptsRemaining,
      });
    }

    const remember = rememberMe === true;

    issueAccessCookie(res, user, remember);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: publicUser(user),
    });
  } catch (error) {
    console.error("Login error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// SUPER ADMIN PASSWORD LOGIN
const superAdminLogin = async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body || {};

    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({
      email: email.trim().toLowerCase(),
      role: "superAdmin",
    }).select("+password");

    if (!user || !user.password) {
      return sendInvalidCredentials(res);
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "Account is inactive",
      });
    }

    const verification = await verifyPassword(user, password);

    if (verification.locked) {
      return res.status(423).json({
        success: false,
        message: "Account locked. Please try again later.",
      });
    }

    if (!verification.valid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
        attemptsRemaining: verification.attemptsRemaining,
      });
    }

    const remember = rememberMe === true;

    issueAccessCookie(res, user, remember);

    return res.status(200).json({
      success: true,
      message: "Super Admin login successful",
      user: publicUser(user),
    });
  } catch (error) {
    console.error("Super Admin login error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// FORGOT PASSWORD — SEND OTP
const forgotPassword = async (req, res) => {
  try {
    const email =
      typeof req.body?.email === "string"
        ? req.body.email.trim().toLowerCase()
        : "";

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const genericResponse = {
      success: true,
      message: "If the account exists, an OTP will be sent.",
    };

    const user = await User.findOne({ email }).select(
      "+otpHash +otpExpiry +otpAttempts"
    );

    if (!user) {
      return res.status(200).json(genericResponse);
    }

    const otp = crypto.randomInt(100000, 1000000).toString();

    user.otpHash = crypto
      .createHash("sha256")
      .update(otp)
      .digest("hex");

    user.otpExpiry = new Date(Date.now() + OTP_EXPIRY);
    user.otpAttempts = 0;

    await user.save();

    try {
      await sendEmail({
        to: user.email,
        subject: "EduSchoolHub Password Reset OTP",
        text: `Your password reset OTP is ${otp}. It expires in 10 minutes.`,
      });
    } catch (emailError) {
      user.otpHash = undefined;
      user.otpExpiry = undefined;
      user.otpAttempts = 0;
      await user.save();

      throw emailError;
    }

    return res.status(200).json(genericResponse);
  } catch (error) {
    console.error("Forgot password error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to process request",
    });
  }
};

// RESET PASSWORD — VERIFY OTP
const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body || {};

    if (
      typeof email !== "string" ||
      typeof otp !== "string" ||
      typeof newPassword !== "string" ||
      !email.trim() ||
      !otp ||
      !newPassword
    ) {
      return res.status(400).json({
        success: false,
        message: "Email, OTP and new password are required",
      });
    }

    if (!/^\d{6}$/.test(otp)) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    const user = await User.findOne({
      email: email.trim().toLowerCase(),
    }).select("+password +otpHash +otpExpiry +otpAttempts");

    if (!user || !user.otpHash || !user.otpExpiry) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    if (user.otpExpiry.getTime() <= Date.now()) {
      user.otpHash = undefined;
      user.otpExpiry = undefined;
      user.otpAttempts = 0;
      await user.save();

      return res.status(400).json({
        success: false,
        message: "OTP expired. Request a new one.",
      });
    }

    if ((user.otpAttempts || 0) >= OTP_MAX_ATTEMPTS) {
      return res.status(429).json({
        success: false,
        message: "Too many OTP attempts. Request a new OTP.",
      });
    }

    const submittedHash = crypto
      .createHash("sha256")
      .update(otp)
      .digest();

    const storedHash = Buffer.from(user.otpHash, "hex");

    const isValid =
      storedHash.length === submittedHash.length &&
      crypto.timingSafeEqual(storedHash, submittedHash);

    if (!isValid) {
      user.otpAttempts = (user.otpAttempts || 0) + 1;
      await user.save();

      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
        attemptsRemaining: Math.max(
          0,
          OTP_MAX_ATTEMPTS - user.otpAttempts
        ),
      });
    }

    user.password = await bcrypt.hash(newPassword, 12);
    user.otpHash = undefined;
    user.otpExpiry = undefined;
    user.otpAttempts = 0;
    user.failedLoginAttempts = 0;
    user.lockUntil = null;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    console.error("Reset password error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to reset password",
    });
  }
};

// LOGOUT
const logout = async (req, res) => {
  clearAccessCookie(res);

  return res.status(200).json({
    success: true,
    message: "Logout successful",
  });
};

module.exports = {
  register,
  login,
  superAdminLogin,
  logout,
  forgotPassword,
  resetPassword,
};
