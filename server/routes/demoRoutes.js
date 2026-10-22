
const express = require("express");
const {
  createDemoRequest,
  getDemoRequests,
  updateDemoRequest,
} = require("../controllers/demoController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

// Public: school owner submits a demo request.
router.post("/", createDemoRequest);

// Protected: Super Admin manages requests.
router.get(
  "/",
  authMiddleware,
  roleMiddleware("superAdmin"),
  getDemoRequests
);

router.patch(
  "/:id",
  authMiddleware,
  roleMiddleware("superAdmin"),
  updateDemoRequest
);

module.exports = router;
