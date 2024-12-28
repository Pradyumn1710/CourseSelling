const express = require('express');
const { courseModel } = require('../admin/database');
const user_router = express.Router();

user_router.get("/all_courses", async (req, res) => {
    try {
        const courses = await courseModel.find();
        if (!courses) {
            return res.status(400).send("No Courses found");
        }
        res.status(200).json({
            success: true,
            message: "All courses retrieved successfully",
            data: courses
        });
    } catch (error) {
        res.status(400).json({
            error: "Error Retrieving data from backend"
        });
    }
});



module.exports = user_router