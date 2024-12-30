const express = require('express');
const router = express.Router();
const {User,adminModel, courseModel} = require('../admin/database'); // Adjust the path as necessary
// const Adminmodel = require('../admin/database'); // Adjust the path as necessary
// const Coursemodel = require('.../admin/database'); // Adjust the path as necessary

router.get('/stats', async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalAdmins = await adminModel.countDocuments();
        const totalCourses = await courseModel.countDocuments();

        res.json({
            totalUsers,
            totalAdmins,
            totalCourses
        });
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;