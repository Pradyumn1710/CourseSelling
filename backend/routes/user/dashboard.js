const express = require('express')
const usermiddleware = require('../../middleware/user_middleware')
const { User ,purchaseModel } = require('../admin/database')
const dashboard = express.Router()

dashboard.get("/", usermiddleware, async (req, res) => {
    // it should return me username and other user details 
    // it should also show the no of courses he has purchased 
    // console.log("testing");
    
    const userid = req.userId
    try {
        const user = await User.findById(userid);
        if (user) {
            const { username, firstname, lastname } = user;
            // Use username, firstname, lastname as needed
            return res.status(200).json({
                username,
                firstname,
                lastname,

            })
        } else {
            return res.json({
                msg : "error"
            })
        }
    }
    catch (error) {
        res.status(400).send("Error Fetching the details")
    }
})
dashboard.get("/purchased", usermiddleware, async (req, res) => {
    // it should also show the no of courses he has purchased 
    const userid = req.userId
    try {
        let courses = await purchaseModel.findById(userid);
        if (courses) {
            const { username, firstname, lastname } = user;
            // Use username, firstname, lastname as needed
            res.status(200).json({
                success: true,
                message: "All courses retrieved successfully",
                data: courses
            });
        } else {
            return res.json({
                msg : "error"
            })
        }
    }
    catch (error) {
        res.status(400).send("Error Fetching the details")
    }
})

module.exports = dashboard