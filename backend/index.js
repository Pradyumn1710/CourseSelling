const express = require('express')
const app = express()
const cookieParser = require('cookie-parser');
app.use(cookieParser());

const routes = require('./routes/index.js')

app.use('/routes',routes)

app.listen(3000,()=>{
    console.log("Backend is running on port 3000");
    
})