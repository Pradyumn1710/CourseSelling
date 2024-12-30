const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Apply middleware
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
    credentials: true, // Allow cookies if necessary
}));
app.use(cookieParser());

// Import and use routes
const routes = require('./routes/index.js');
app.use('/routes', routes);

// Start the server
app.listen(3000, () => {
    console.log("Backend is running on port 3000");
});
