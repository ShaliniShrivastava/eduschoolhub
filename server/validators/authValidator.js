const { body, validationResult } = require("express-validator");

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed.",
      errors: errors.array().map(({ path, msg }) => ({
        field: path,
        message: msg,
      })),
    });
  }

  return next();
};

const emailValidation = body("email")
  .isString()
  .withMessage("Email must be a string.")
  .bail()
  .trim()
  .isEmail()
  .withMessage("Enter a valid email address.")
  .bail()
  .normalizeEmail();

const passwordValidation = body("password")
  .isString()
  .withMessage("Password must be a string.")
  .bail()
  .notEmpty()
  .withMessage("Password is required.");

const strongPasswordValidation = (field = "password") =>
  body(field)
    .isString()
    .withMessage("Password must be a string.")
    .bail()
    .isLength({ min: 8 })
    .withMessage("Password must contain at least 8 characters.")
    .bail()
    .matches(/[A-Z]/)
    .withMessage("Password must contain an uppercase letter.")
    .bail()
    .matches(/[a-z]/)
    .withMessage("Password must contain a lowercase letter.")
    .bail()
    .matches(/[0-9]/)
    .withMessage("Password must contain a number.")
    .bail()
    .matches(/[^A-Za-z0-9]/)
    .withMessage("Password must contain a special character.");

const validateRegister = [
  body("name")
    .isString()
    .withMessage("Name must be a string.")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Name is required.")
    .bail()
    .isLength({ max: 100 })
    .withMessage("Name cannot exceed 100 characters."),

  emailValidation,
  strongPasswordValidation("password"),
  validateRequest,
];

const validateLogin = [
  emailValidation,
  passwordValidation,
  validateRequest,
];

const validateSuperAdminLogin = [
  emailValidation,
  passwordValidation,
  body("rememberMe")
    .optional()
    .isBoolean()
    .withMessage("rememberMe must be a boolean."),
  validateRequest,
];

const validateForgotPassword = [
  emailValidation,
  validateRequest,
];

const validateResetPassword = [
  emailValidation,

  body("otp")
    .isString()
    .withMessage("OTP must be a string.")
    .bail()
    .matches(/^\d{6}$/)
    .withMessage("OTP must be exactly 6 digits."),

  strongPasswordValidation("newPassword"),
  validateRequest,
];

const validateGoogleCredential = [
  body("credential")
    .isString()
    .withMessage("Google credential is required.")
    .bail()
    .notEmpty()
    .withMessage("Google credential cannot be empty."),
  validateRequest,
];

module.exports = {
  validateRequest,
  validateRegister,
  validateLogin,
  validateSuperAdminLogin,
  validateForgotPassword,
  validateResetPassword,
  validateGoogleCredential,
};