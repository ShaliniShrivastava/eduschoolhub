
const express = require("express");
const AuthController = require("../controllers/authController");

const router = express.Router();

router.post("/register", AuthController.register);

router.post("/login", AuthController.login);

router.post(
  "/super-admin/login",
  AuthController.superAdminLogin
);

router.post("/logout", AuthController.logout);

router.post(
  "/forgot-password",
  AuthController.forgotPassword
);

router.post(
  "/reset-password",
  AuthController.resetPassword
);

module.exports = router;
