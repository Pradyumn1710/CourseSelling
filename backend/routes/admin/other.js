const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken")
require("dotenv").config();
const {User} = require('../admin/database'); // Adjust the path as necessary
const {adminModel} = require('../admin/database'); // Adjust the path as necessary
const {courseModel} = require('../admin/database'); // Adjust the path as necessary

const JWT_USER_PASSWORD = process.env.JWT_USER_PASSWORD;
const JWT_ADMIN_PASSWORD = process.env.JWT_ADMIN_PASSWORD;

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

router.get('/verifytoken', (req, res) => {
    const token = req.cookies.auth_cookie; // Replace 'auth_cookie' with the actual cookie name
    console.log(token);
    
    if (token) {
        try {
            let decoded;
            // try {
            //     console.log(JWT_USER_PASSWORD);
                
                decoded = jwt.verify(token, JWT_USER_PASSWORD); // Try verifying with user password
                console.log(decoded);
                
            // } catch (userError) {
            //     decoded = jwt.verify(token, JWT_ADMIN_PASSWORD); // If it fails, try verifying with admin password
            //     console.log(decoded);
            // }
            res.json({ username: decoded.username }); // Assuming the JWT payload contains a 'username' field
        } catch (error) {
            console.error('Error decoding JWT:', error);
            res.status(401).json({ error: 'Invalid token' });
        }
    } else {
        res.status(400).json({ error: 'No token provided' });
    }
});

module.exports = router;