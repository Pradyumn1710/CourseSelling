const jwt = require("jsonwebtoken")
require("dotenv").config();

const JWT_USER_PASSWORD = process.env.JWT_USER_PASSWORD;
function usermiddleware(req,res,next){
   console.log('Cookies:', req.cookies);  
       // Get the token from headers or cookies
       const token = req.cookies.auth_cookie;
   
       // Check if the token exists
       if (!token) {
           return res.status(401).send("Authentication failed: No token provided.");
       }
   
       try {
           // Decode and verify the token
           const decoded = jwt.verify(token, JWT_USER_PASSWORD_PASSWORD);
           req.userId = decoded.id; // Attach the userId to the request
           next(); // Call next middleware or route handler
       } catch (err) {
           return res.status(401).send("Authentication failed: Invalid or expired token.");
       }
    }
    


module.exports = 
    usermiddleware
