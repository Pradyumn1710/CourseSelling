const express = require('express');
const { z } = require('zod');
const { adminModel } = require('../admin/database');
require('dotenv').config();
const router = express.Router();
const jwt = require("jsonwebtoken")
const JWT_ADMIN_PASSWORD = process.env.JWT_ADMIN_PASSWORD;


router.use(express.json());


const loginSchema = z.object({
    username: z.string()
        .min(3, "Username must be at least 3 characters long")
        .max(20, "Username must be less than 20 characters"),
    password: z.string()
        .min(3,"Password should be greater than 3")
        .max(20,'Password should be less than 20')
})

// Zod schema for signup (firstname, lastname, password, username)
const signupSchema = z.object({
    username: z.string()
        .min(3, "Username must be at least 3 characters long")
        .max(20, "Username must be less than 20 characters"),
    firstname: z.string()
        .min(3, "Firstname must be at least 3 characters long")
        .max(20, "Firstname must be less than 20 characters"),
    lastname: z.string()
        .min(3, "Lastname must be at least 3 characters long")
        .max(20, "Lastname must be less than 20 characters"),
    password: z.string().min(6, "Password must be at least 6 characters long").regex(/(?=.*[A-Z])/, "Password must contain at least one uppercase letter").regex(/(?=.*[0-9])/, "Password must contain at least one number").regex(/(?=.*[!@#$%^&*])/, "Password must contain at least one special character"),
})

// Signup route
router.post('/signup', async (req, res) => {
    // console.log(req.body);
    
    const credentials = signupSchema.safeParse(req.body);
    // console.log(credentials);
    

    // Check if the input format is valid
    if (!credentials.success) {
        return res.status(400).json({ error: "Invalid input format. Please check your details." });
    }

    const { username, firstname, lastname, password } = req.body;

    try {
        // Check if the user already exists
        const userExists = await adminModel.findOne({ username });
        console.log(userExists);
        
        if (userExists) {
            return res.status(400).json({ error: "User already exists" });
        }

        // Create and save the new user
        const newUser = await new adminModel({username, firstname, lastname, password });
        await newUser.save();

        res.status(201).send("Signup successful");
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Login route (to be implemented)
router.get('/login',async (req, res) => {
    // res.send("Login endpoint is under development.");
    const credentials = loginSchema.safeParse(req.body)
    if(!credentials.success){
        return res.status(400).json({
            'msg':"Incorrect format"
        })
    }
    const {username , password} = req.body
    try{
        const user = await adminModel.findOne({ username })
        if (!user) {
            return res.status(400).json({ msg: "Invalid username or password" })
        }

        if (user.password !== password) {
            return res.status(400).json({ msg: "Invalid username or password" })
        }
        console.log(username,password);
        
        const token = jwt.sign({
            id : user._id ,
            username : user.username
        },JWT_ADMIN_PASSWORD , {expiresIn:'24h'})
        
        res.cookie('auth_cookie',token,{
            httpOnly:true,
            secure:process.env.NODE_ENV === 'production',
            sameSite:'Strict',
            maxAge : 24 * 60 * 60 * 1000

        });
        res.status(200).send("Login succesfull")
    }
    catch(error){
        console.log(error)
        res.status(500).send("Internal Server error")
    }
});

module.exports = router;
