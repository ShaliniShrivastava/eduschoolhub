const bcrypt = require("bcryptjs");
const User = require("../models/User");

const createSchoolAdmin = async (req, res) => {
  try {
    const { name, email, password, schoolId } = req.body;

    if (!name || !email || !password || !schoolId) {
      return res.status(400).json({
        success: false,
        message: "Name, email, password and schoolId are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const schoolAdmin = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "SCHOOL_ADMIN",
      schoolId,
      isActive: true,
    });

    res.status(201).json({
      success: true,
      message: "School Admin created successfully",
      user: {
        id: schoolAdmin._id,
        name: schoolAdmin.name,
        email: schoolAdmin.email,
        role: schoolAdmin.role,
        schoolId: schoolAdmin.schoolId,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createSchoolAdmin,
};