const User = require("../models/User");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { sendEmail } = require("../services/emailService");

const {
  issueAccessCookie,
  clearAccessCookie,
} = require("../services/sessionService");

const { verifyGoogleIdToken } = require("../services/googleAuthService");

const MAX_ATTEMPTS = Infinity;
// const MAX_ATTEMPTS = 5;
const LOCK_TIME = 15 * 60 * 1000;
const OTP_EXPIRY = 10 * 60 * 1000;
const OTP_MAX_ATTEMPTS = 5;

// Never return passwords, Google IDs, or security hashes.
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
  return Boolean(user.lockUntil && user.lockUntil.getTime() > Date.now());
}

function clearExpiredLock(user) {
  if (user.lockUntil && user.lockUntil.getTime() <= Date.now()) {
    user.failedLoginAttempts = 0;
    user.lockUntil = null;
  }
}

function validatePassword(password) {
  const errors = [];

  if (password.length < 8) errors.push("at least 8 characters");
  if (!/[A-Z]/.test(password)) errors.push("an uppercase letter");
  if (!/[a-z]/.test(password)) errors.push("a lowercase letter");
  if (!/[0-9]/.test(password)) errors.push("a number");
  if (!/[^A-Za-z0-9]/.test(password)) errors.push("a special character");

  return errors;
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
      attemptsRemaining: Math.max(0, MAX_ATTEMPTS - user.failedLoginAttempts),
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

function handleGoogleError(res, error) {
  if (
    error.message === "INVALID_GOOGLE_TOKEN" ||
    error.message === "UNVERIFIED_GOOGLE_ACCOUNT"
  ) {
    return res.status(401).json({
      success: false,
      message: "Google authentication failed.",
    });
  }

  console.error("Google authentication error:", error.message);

  return res.status(500).json({
    success: false,
    message: "Unable to complete Google authentication.",
  });
}

// Register a School Admin with email and password.
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body || {};

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string" ||
      !name.trim() ||
      !email.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required.",
      });
    }

    const passwordErrors = validatePassword(password);

    if (passwordErrors.length) {
      return res.status(400).json({
        success: false,
        message: `Password must contain ${passwordErrors.join(", ")}.`,
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    if (await User.findOne({ email: normalizedEmail })) {
      return res.status(409).json({
        success: false,
        message: "User already exists with this email.",
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
      message: "School Admin registered successfully.",
      user: publicUser(user),
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Email or Google account already registered.",
      });
    }

    console.error("Register error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// General email/password login.
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
        message: "Email and password are required.",
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
        message: "Account is inactive.",
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
        message: "Invalid email or password.",
        attemptsRemaining: verification.attemptsRemaining,
      });
    }

    issueAccessCookie(res, user, rememberMe === true);

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      user: publicUser(user),
    });
  } catch (error) {
    console.error("Login error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// Super Admin email/password login.
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
        message: "Email and password are required.",
      });
    }

    const user = await User.findOne({
      email: email.trim().toLowerCase(),
      role: "superAdmin",
    }).select("+password");
//debugging info for super admin login
    console.log("[SUPER ADMIN DEBUG]", {
  userFound: Boolean(user),
  passwordHashExists: Boolean(user?.password),
  role: user?.role ?? null,
  isActive: user?.isActive ?? null,
});

    if (!user || !user.password) {
      return sendInvalidCredentials(res);
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "Account is inactive.",
      });
    }

    const verification = await verifyPassword(user, password);
    //verification debug info for super admin login
console.log("[PASSWORD DEBUG]", {
  valid: verification.valid,
  locked: verification.locked,
  attemptsRemaining: verification.attemptsRemaining,
});

    if (verification.locked) {
      return res.status(423).json({
        success: false,
        message: "Account locked. Please try again later.",
      });
    }

    if (!verification.valid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
        attemptsRemaining: verification.attemptsRemaining,
      });
    }

    issueAccessCookie(res, user, rememberMe === true);

    return res.status(200).json({
      success: true,
      message: "Super Admin login successful.",
      user: publicUser(user),
    });
  } catch (error) {
    console.error("Super Admin login error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// Google registration: public registration creates School Admin only.
// Never accept a role from the request body.
const googleRegister = async (req, res) => {
  try {
    const { credential } = req.body || {};

    const identity = await verifyGoogleIdToken(credential);

    const existingGoogleUser = await User.findOne({
      googleId: identity.googleId,
    });

    if (existingGoogleUser) {
      return res.status(409).json({
        success: false,
        message: "This Google account is already registered. Please log in.",
        code: "GOOGLE_ACCOUNT_EXISTS",
      });
    }

    const existingEmail = await User.findOne({
      email: identity.email,
    });

    if (existingEmail) {
      return res.status(409).json({
        success: false,
        message:
          "An account already exists with this email. Log in using your existing method and securely link Google.",
        code: "GOOGLE_LINK_REQUIRED",
      });
    }

    const user = await User.create({
      name: identity.name || identity.email.split("@")[0],
      email: identity.email,
      googleId: identity.googleId,
      role: "schoolAdmin",
      password: undefined,
      schoolId: null,
      isActive: true,
    });

    issueAccessCookie(res, user);

    return res.status(201).json({
      success: true,
      message: "School Admin registered successfully with Google.",
      user: publicUser(user),
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "This email or Google account is already registered.",
      });
    }

    return handleGoogleError(res, error);
  }
};

// Google login: only an already-linked account can log in.
const googleLogin = async (req, res) => {
  try {
    const { credential } = req.body || {};

    const identity = await verifyGoogleIdToken(credential);

    const user = await User.findOne({
      googleId: identity.googleId,
    });

    if (!user) {
      return res.status(403).json({
        success: false,
        message:
          "No linked EduSchoolHub account was found. Register or securely link your existing account.",
        code: "GOOGLE_ACCOUNT_NOT_LINKED",
      });
    }

    if (user.email !== identity.email) {
      return res.status(403).json({
        success: false,
        message: "Google account details do not match the linked account.",
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "Account is inactive.",
      });
    }

    issueAccessCookie(res, user);

    return res.status(200).json({
      success: true,
      message: "Google login successful.",
      user: publicUser(user),
    });
  } catch (error) {
    return handleGoogleError(res, error);
  }
};

// Link Google to the currently authenticated user's account.
// The route MUST use authMiddleware.
const linkGoogleAccount = async (req, res) => {
  try {
    if (!req.user?._id) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const { credential } = req.body || {};
    const identity = await verifyGoogleIdToken(credential);

    const user = await User.findById(req.user._id);

    if (!user || !user.isActive) {
      return res.status(403).json({
        success: false,
        message: "Account is unavailable.",
      });
    }

    // Require the signed-in account and Google identity to match.
    if (user.email !== identity.email) {
      return res.status(403).json({
        success: false,
        message: "The verified Google email must match your account email.",
      });
    }

    if (user.googleId && user.googleId !== identity.googleId) {
      return res.status(409).json({
        success: false,
        message: "A different Google account is already linked.",
      });
    }

    const linkedUser = await User.findOne({
      googleId: identity.googleId,
      _id: { $ne: user._id },
    });

    if (linkedUser) {
      return res.status(409).json({
        success: false,
        message: "This Google account is already linked to another user.",
      });
    }

    if (!user.googleId) {
      user.googleId = identity.googleId;
      await user.save();
    }

    return res.status(200).json({
      success: true,
      message: "Google account linked successfully.",
      user: publicUser(user),
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "This Google account is already linked.",
      });
    }

    return handleGoogleError(res, error);
  }
};

// Forgot password: send OTP.
const forgotPassword = async (req, res) => {
  try {
    const email =
      typeof req.body?.email === "string"
        ? req.body.email.trim().toLowerCase()
        : "";

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    const genericResponse = {
      success: true,
      message: "If the account exists, an OTP will be sent.",
    };

    const user = await User.findOne({ email }).select(
      "+otpHash +otpExpiry +otpAttempts",
    );

    if (!user) {
      return res.status(200).json(genericResponse);
    }

    const otp = crypto.randomInt(100000, 1000000).toString();

    user.otpHash = crypto.createHash("sha256").update(otp).digest("hex");
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
      message: "Unable to process request.",
    });
  }
};

// Reset password: verify OTP.
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
        message: "Email, OTP and new password are required.",
      });
    }

    if (!/^\d{6}$/.test(otp)) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP.",
      });
    }

    const passwordErrors = validatePassword(newPassword);

    if (passwordErrors.length) {
      return res.status(400).json({
        success: false,
        message: `Password must contain ${passwordErrors.join(", ")}.`,
      });
    }

    const user = await User.findOne({
      email: email.trim().toLowerCase(),
    }).select("+password +otpHash +otpExpiry +otpAttempts");

    if (!user || !user.otpHash || !user.otpExpiry) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP.",
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

    const submittedHash = crypto.createHash("sha256").update(otp).digest();

    const storedHash = Buffer.from(user.otpHash, "hex");

    const isValid =
      storedHash.length === submittedHash.length &&
      crypto.timingSafeEqual(storedHash, submittedHash);

    if (!isValid) {
      user.otpAttempts = (user.otpAttempts || 0) + 1;
      await user.save();

      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP.",
        attemptsRemaining: Math.max(0, OTP_MAX_ATTEMPTS - user.otpAttempts),
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
      message: "Password reset successful.",
    });
  } catch (error) {
    console.error("Reset password error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to reset password.",
    });
  }
};

/* Get the currently authenticated user's session */
const getCurrentUser = async (req, res) => {
  if (!req.user || req.user.isActive !== true) {
    return res.status(401).json({
      success: false,
      message: "Authentication required.",
      code: "NOT_AUTHENTICATED",
    });
  }

  return res.status(200).json({
    success: true,
    user: publicUser(req.user),
  });
};

// Logout.
const logout = async (req, res) => {
  clearAccessCookie(res);

  return res.status(200).json({
    success: true,
    message: "Logout successful.",
  });
};

module.exports = {
  register,
  login,
  superAdminLogin,
  googleRegister,
  googleLogin,
  linkGoogleAccount,
  getCurrentUser,
  logout,
  forgotPassword,
  resetPassword,
};
