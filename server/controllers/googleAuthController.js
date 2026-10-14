
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

    // Verify Google's ID token.
    const identity = await verifyGoogleIdToken(credential);

    const authorizedEmail = (
      process.env.SUPER_ADMIN_GOOGLE_EMAIL || ""
    )
      .trim()
      .toLowerCase();

    const googleEmail = (identity.email || "")
      .trim()
      .toLowerCase();

    // Only the authorized Google email can access Super Admin.
    if (!authorizedEmail || googleEmail !== authorizedEmail) {
      return res.status(403).json({
        success: false,
        message: "This Google account is not authorized.",
      });
    }

    // Find the existing Super Admin account by verified email.
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

    // Do not replace an existing link to another Google account.
    if (user.googleId && user.googleId !== identity.googleId) {
      return res.status(403).json({
        success: false,
        message: "A different Google account is already linked.",
      });
    }

    // Automatically save the verified Google ID if not linked.
    if (!user.googleId) {
      user.googleId = identity.googleId;
      await user.save();
    }

    // Create the authenticated session.
    issueAccessCookie(res, user);

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
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

    console.error(
      "Google Super Admin login failed:",
      error.message
    );

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
