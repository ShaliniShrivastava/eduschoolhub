
const express = require("express");
const AuthController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Email and password authentication
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/super-admin/login", AuthController.superAdminLogin);

// Google authentication
router.post("/google/register", AuthController.googleRegister);
router.post("/google/login", AuthController.googleLogin);

// Only an authenticated user can link a Google account.
router.post(
  "/google/link",
  authMiddleware,
  AuthController.linkGoogleAccount
);

// Password recovery
router.post("/forgot-password", AuthController.forgotPassword);
router.post("/reset-password", AuthController.resetPassword);
router.get("/me", authMiddleware, AuthController.getCurrentUser);

// Logout
router.post("/logout", AuthController.logout);

module.exports = router;
