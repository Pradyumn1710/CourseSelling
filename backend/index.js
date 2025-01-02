const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');


app.use(cors({
    origin: true, 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true, 
}));
app.use(cookieParser());
app.use(express.json());


const routes = require('./routes/index.js');
app.use('/routes', routes);

// Start the server
app.listen(3000, () => {
    console.log("Backend is running on port 3000");
});
