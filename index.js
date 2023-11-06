const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')
const morgan = require('morgan');
const client_route = require('./src/routes/clientRoute.js');
require("dotenv").config();

const url = process.env.DB_URL
const port = process.env.PORT

// for http request 
app.use(morgan('dev'));
// for communicate with cors platform
app.use(cors());
// To handle the incoming request
app.use(express.json())


// To pass and handle the routes 
app.use('/api', client_route);

// mongoDB Connection 
mongoose.connect(url)
.then(()=>{
    app.listen(port,()=>console.log(`Server runing on the port ${port}`))
})
.catch((error)=>console.log(`${error} did not connect`))