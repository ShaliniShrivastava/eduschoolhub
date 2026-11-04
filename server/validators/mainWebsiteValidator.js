const { body, validationResult } = require("express-validator");

const allowedPages = ["home", "about", "features", "modules", "pricing"];

const validateMainWebsitePage = [
  body("page")
    .trim()
    .notEmpty()
    .withMessage("Page name is required")
    .isIn(allowedPages)
    .withMessage("Invalid Main Website page"),

  body("content")
    .exists()
    .withMessage("Page content is required")
    .isObject()
    .withMessage("Page content must be an object"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array().map((error) => ({
          field: error.path,
          message: error.msg,
        })),
      });
    }

    next();
  },
];

module.exports = { validateMainWebsitePage };