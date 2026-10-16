
const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  createSchoolAdmin,
} = require("../controllers/superAdminController");

const {
  createSchool,
} = require("../controllers/schoolController");

console.log(
  "createSchoolAdmin:",
  typeof createSchoolAdmin
);

const router = express.Router();

const requireSuperAdmin = [
  authMiddleware,
  roleMiddleware("superAdmin"),
];

router.get(
  "/dashboard",
  ...requireSuperAdmin,
  (req, res) => {
    return res.status(200).json({
      success: true,
      message: "Super Admin Dashboard",
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
      },
    });
  }
);

router.post(
  "/create-school-admin",
  ...requireSuperAdmin,
  createSchoolAdmin
);

router.post(
  "/create-school",
  ...requireSuperAdmin,
  createSchool
);

module.exports = router;
