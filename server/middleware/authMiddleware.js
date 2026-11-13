// server/middleware/authMiddleware.js

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
    console.log("Cookie header present:", Boolean(req.headers.cookie));

    console.log(
      "Cookie names:",
      (req.headers.cookie || "")
        .split(";")
        .map((item) => item.split("=")[0].trim())
        .filter(Boolean),
    );

    console.log("Parsed cookies:", Object.keys(req.cookies || {}));
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
      issuer: "eduschoolhub",
      audience: "eduschoolhub-client",
    });

    const userId = decoded.userId || decoded.sub;

    if (!userId || decoded.tokenType !== "access") {
      clearAccessCookie(res);

      return res.status(401).json({
        success: false,
        message: "Invalid token",
        code: "INVALID_TOKEN",
      });
    }

    const user = await User.findById(userId);

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

    req.user = user;

    return next();
  } catch (error) {
    // Expired access token: preserve refresh token for session renewal.
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Access token expired. Refresh session required.",
        code: "SESSION_EXPIRED",
      });
    }

    // Invalid access token: clear both cookies.
    if (
      ["JsonWebTokenError", "NotBeforeError", "CastError"].includes(error.name)
    ) {
      clearAccessCookie(res);

      return res.status(401).json({
        success: false,
        message: "Invalid token",
        code: "INVALID_TOKEN",
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
