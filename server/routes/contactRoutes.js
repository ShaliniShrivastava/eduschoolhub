const express = require("express");
const { rateLimit } = require("express-rate-limit");

const {
  submitContactEnquiry,
} = require("../controllers/contactController");

const router = express.Router();

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many enquiries submitted. Please try again later.",
  },
});

router.post("/", contactLimiter, submitContactEnquiry);

module.exports = router;