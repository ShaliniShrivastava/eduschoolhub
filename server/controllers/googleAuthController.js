const User = require("../models/User");
const { verifyGoogleIdToken } = require("../services/googleAuthService");
const {
  issueAccessCookie,
  clearAccessCookie,
} = require("../services/sessionService");

async function googleSuperAdminLogin(req, res) {
  try {
    const { credential } = req.body || {};

    if (typeof credential !== "string" || !credential.trim()) {
      return res.status(400).json({
        success: false,
        message: "Google credential is required.",
      });
    }

    const authorizedEmail = (
      process.env.SUPER_ADMIN_GOOGLE_EMAIL || ""
    ).trim().toLowerCase();

    if (!authorizedEmail) {
      console.error("SUPER_ADMIN_GOOGLE_EMAIL is not configured.");

      return res.status(500).json({
        success: false,
        message: "Authentication is not configured.",
      });
    }

    const identity = await verifyGoogleIdToken(credential);

    if (identity.email !== authorizedEmail) {
      return res.status(403).json({
        success: false,
        message: "This Google account is not authorized.",
      });
    }

    const user = await User.findOne({
      email: authorizedEmail,
      role: "superAdmin",
    }).select("+isActive");

    if (!user || user.isActive !== true) {
      return res.status(403).json({
        success: false,
        message: "This Google account is not authorized.",
      });
    }

    if (user.googleId && user.googleId !== identity.googleId) {
      return res.status(403).json({
        success: false,
        message: "A different Google account is already linked.",
      });
    }

    if (!user.googleId) {
      try {
        user.googleId = identity.googleId;
        await user.save();
      } catch (error) {
        if (error.code === 11000) {
          return res.status(409).json({
            success: false,
            message: "This Google account is already linked to another user.",
          });
        }

        throw error;
      }
    }

    issueAccessCookie(res, user);

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        schoolId: user.schoolId,
        isFirstLogin: user.isFirstLogin,
        isProfileComplete: user.isProfileComplete,
      },
    });
  } catch (error) {
    if (
      error.message === "INVALID_GOOGLE_TOKEN" ||
      error.message === "UNVERIFIED_GOOGLE_ACCOUNT"
    ) {
      return res.status(401).json({
        success: false,
        message: "Google authentication failed.",
      });
    }

    console.error("Google Super Admin login failed:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to complete login.",
    });
  }
}

async function googleSuperAdminLogout(req, res) {
  clearAccessCookie(res);

  return res.status(200).json({
    success: true,
    message: "Logout successful.",
  });
}

module.exports = {
  googleSuperAdminLogin,
  googleSuperAdminLogout,
};