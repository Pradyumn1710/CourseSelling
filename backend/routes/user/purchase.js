const express = require('express');
const purchaseRouter = express.Router();
const mongoose = require('mongoose');  // Import mongoose to use sessions

const {courseModel , purchaseModel } = require('../admin/database'); // Assuming models are defined
const usermiddleware = require('../../middleware/user_middleware'); // Your existing middleware

purchaseRouter.use(usermiddleware);

// // Parse JSON body
purchaseRouter.use(express.json());


purchaseRouter.post('/purchase-course/:courseId', async (req, res) => {
    const { courseId } = req.params;
    const userId = req.user.id; // Assuming the middleware attaches user info to req.user

    // Start a session for transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Check if the course exists
        const course = await courseModel.findById(courseId).session(session);
        if (!course) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ message: 'Course not found.' });
        }

        // Check if the user has already purchased the course
        const existingPurchase = await courseModel.findOne({ userId, courseId }).session(session);
        if (existingPurchase) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ message: 'You have already purchased this course.' });
        }

        // Record the purchase
        await purchaseModel.create([{ userId, courseId }], { session });

        // Commit the transaction
        await session.commitTransaction();
        session.endSession();

        res.status(200).json({ message: 'Course purchased successfully.' });
    } catch (error) {
        // Abort the transaction in case of an error
        await session.abortTransaction();
        session.endSession();
        console.error(error);
        res.status(500).json({ message: 'An error occurred during the purchase process.' });
    }
});

module.exports = purchaseRouter
