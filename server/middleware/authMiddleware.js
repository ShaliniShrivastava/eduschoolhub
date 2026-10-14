const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { clearAccessCookie } = require("../services/sessionService");

const authMiddleware = async (req, res, next) => {
  try {
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is missing");

      return res.status(500).json({
        success: false,
        message: "Server configuration error",
      });
    }

    const token = req.cookies?.accessToken;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
        code: "NOT_AUTHENTICATED",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ["HS256"],
    });

    if (!decoded.userId) {
      clearAccessCookie(res);

      return res.status(401).json({
        success: false,
        message: "Invalid token",
        code: "INVALID_TOKEN",
      });
    }

    const user = await User.findById(decoded.userId);

    if (!user) {
      clearAccessCookie(res);

      return res.status(401).json({
        success: false,
        message: "User account not found",
        code: "USER_NOT_FOUND",
      });
    }

    if (user.isActive !== true) {
      clearAccessCookie(res);

      return res.status(403).json({
        success: false,
        message: "Your account is disabled",
        code: "ACCOUNT_DISABLED",
      });
    }

    // Always trust the current database role, not the JWT role claim.
    req.user = user;

    return next();
  } catch (error) {
    if (
      [
        "JsonWebTokenError",
        "TokenExpiredError",
        "NotBeforeError",
        "CastError",
      ].includes(error.name)
    ) {
      clearAccessCookie(res);

      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
        code: "SESSION_EXPIRED",
      });
    }

    console.error("Auth middleware error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = authMiddleware;
