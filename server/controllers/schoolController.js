const School = require("../models/School");

const createSchool = async (req, res) => {
    try {
        const { name, email, phone, address, city, state } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "School name is required",
            });
        }

        const school = await School.create({
            name,
            email,
            phone,
            address,
            city,
            state,
        });

        res.status(201).json({
            success: true,
            message: "School created successfully",
            school,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createSchool,
};