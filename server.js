// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const app = express();

// Require cors ,and bodyParser packages
const bodyParser = require('body-parser');
const cors = require('cors');

// Start up an instance of app

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server

// test our server if it's runing or not.
const localhost = 8080;
app.listen(localhost,()=>console.log(`the post hosting at localhost : http://localhost:${localhost}`));

//get data from api url from /all section ,and send the projectData object as a respond.
app.get('/all',(req,res)=>{
    projectData.temp = req.body;
    res.send(projectData);
});

//post data from api url from /postRoute section ,and store the projectData object ,then send the projectData object as a respond.
app.post('/postRoute',(req,res)=>{
    console.log(req.body);
     projectData.temp = req.body;

});
