const express = require("express");
const rateLimit = require("express-rate-limit");

const {
  googleSuperAdminLogin,
  googleSuperAdminLogout,
} = require("../controllers/googleAuthController");

const router = express.Router();

const googleLoginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: "Too many login attempts. Please try again later.",
  },
});

router.post("/super-admin", googleLoginLimiter, googleSuperAdminLogin);
router.post("/super-admin/logout", googleSuperAdminLogout);

module.exports = router;