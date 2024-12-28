const express = require('express');
const { courseModel } = require('../admin/database'); // Correct import path
const adminMiddleware = require('../../middleware/admin_middleware'); // Correct import path

const adminRouter = express.Router();

// Apply the middleware to all routes in adminRouter
adminRouter.use(adminMiddleware);

// Parse JSON body
adminRouter.use(express.json());

// Route to add a course
adminRouter.post("/add_course", async function(req, res) {
    const adminId = req.userId;  // From the adminMiddleware

    const { title, description, imageUrl, price } = req.body;

    try {
        // Creating the course in the database
        const course = await courseModel.create({
            title: title,
            description: description,
            imageUrl: imageUrl,
            price: price,
            creatorId: adminId
        });

        res.json({
            message: "Course created successfully",
            courseId: course._id
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// Route to update a course
adminRouter.put("/course", async function(req, res) {
    const adminId = req.userId;  // From the adminMiddleware

    const { title, description, imageUrl, price, courseId } = req.body;

    try {
        // Updating the course in the database
        const course = await courseModel.updateOne(
            { _id: courseId, creatorId: adminId },
            {
                title: title,
                description: description,
                imageUrl: imageUrl,
                price: price
            }
        );

        res.json({
            message: "Course updated successfully",
            courseId: courseId
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// Route to get all courses by the admin (optional)
adminRouter.get("/course/bulk", async function(req, res) {
    const adminId = req.userId;  // From the adminMiddleware

    try {
        // Find courses created by the admin
        const courses = await courseModel.find({ creatorId: adminId });

        res.json({
            message: "Courses retrieved successfully",
            courses
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = adminRouter;
