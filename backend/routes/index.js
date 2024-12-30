const express = require('express');
const router = express.Router(); // Use Router instead of creating a new app instance


const User_auth = require('./user/user_authentication.js');
const admin_auth = require('./admin/admin_auth');
const admincourses = require('./admin/admin_course.js')
const usercourses = require("./user/user_course.js")
const purchaseRouter = require("./user/purchase.js")
const dashboard = require("./user/dashboard.js")
// const database = require('./admin/database');

// Use the user_authentication router
router.use('/user_authentication', User_auth);
router.use('/admin_authentication', admin_auth);
router.use('/admincourses',admincourses);
router.use('/user/dashboard',dashboard);
// router.use('/purchase',purchaseRouter);


module.exports = router;  // Export the router
