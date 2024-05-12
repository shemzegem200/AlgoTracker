const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const {spawn} = require('child_process');
const mongoose = require('mongoose');
//custom model
const Board = require('./models/Board.js');

//middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
const PORT = 4000;




//testing the base route
app.get("/", (req, res) => {
    res.status(200).json('test successful');
});
//testing...get all boards
app.get("/all-boards", async(req, res) => {
    try{
        const arr = await Board.find();
        res.json(arr);
    }
    catch(err){
        res.status(500).json({err:err.message});
    }
});




// API endpoint for running Python script
app.post('/run-python-script', (req, res) => {
    const {param1} = req.body;
    
    // console.log('param1= ', param1);
    //serialize the json object to string to pass it as a command line argument to python script
    const jsonString = JSON.stringify(param1);
    // Execute Python script with parameters
    const pythonProcess = spawn('python', ['./PY_check_valid.py', jsonString]);
  
    // Capture output from Python script
    let scriptOutput = '';
    let responseSent = false;

    pythonProcess.stdout.on('data', (data) => {
        const result = data.toString().trim();
        console.log(`Result from Python script: ${result}`);
        scriptOutput += result;
    });
    // Handle errors
    pythonProcess.stderr.on('data', (data) => {
        console.error(`Python script error: ${data}`);
        if (!responseSent){
            res.status(500).json({ error: 'An error occurred while executing Python script' });
            responseSent = true;
        }
    });
    // Handle process completion
    pythonProcess.on('close', (code) => {
      console.log(`Python script process exited with code ${code}`);
      if (!responseSent){
        res.json({ result: scriptOutput });
        responseSent = true;
      }
    });
  });




//endpoint to add board to database
app.post("/create-board", async(req, res) => {
    const board = req.body.param1;
    // console.log(board);//testing
    try{
        const createdBoard = await Board.create({board});
        res.status(200).json(createdBoard);
    }catch(err){
        res.status(500).json({ error: 'An error occurred while creating the board' });
    }
});




//endpoint to get the board
app.get("/:id", async(req,res) => {
    const {id} = req.params;
    try{
        const response = await Board.findById(id);
        //add code here
        if (!response) res.status(500).json({err:"board not found"});
        else res.json(response);
    }catch(err){
        res.status(500).json({err:err.message});
    }
});




//connect to database
mongoose.connect('mongodb+srv://shyamvaradharajan200:Gops123!@cluster0.v9ew02r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .catch((err) => {
        console.log("Could not connect to database");
        console.log({err:err.message});
    })
    .then(() => {
        console.log("Connected to database");
});

//listen for clients
app.listen(PORT, ()=>{
    console.log('server running on port '+PORT);
});