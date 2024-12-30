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
            console.log("hii");
            
           // Decode and verify the token
           const decoded = jwt.verify(token, JWT_USER_PASSWORD);
           console.log(decoded);
           req.userId = decoded.id; // Attach the userId to the request
        //    console.log(decode.id +"sjduus");
           
           next(); // Call next middleware or route handler
       } catch (err) {
           return res.status(401).send(err);
       }
    }
    


module.exports = 
    usermiddleware
