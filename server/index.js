const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const dotenv = require("dotenv")
const UserModel = require('./Models/User')

const app =express();
app.use(cors());
app.use(express.json()); //the data that is passed from the frontend will be converted into json
dotenv.config();
const port = process.env.PORT || 3001;
 //mongodb://localhost:27017 instead of the local host you can add 127.0.0.1
//MONGODB_URI = 'mongodb://127.0.0.1:27017/crud'
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }) //here in the mongodb we have created a database with the "crud" so /crud should be given
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

app.get('/', async(req,res)=>{
    UserModel.find()  //to get all the users present inside the database we use find() method
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.post("/create",(req,res) => {
    UserModel.create(req.body) //the data that we send from frontend to backend that data will be present inside the "req.body" 
    //when you create a new user then this create() method is used
    .then(user => res.json(user))
    .catch(err => res.json(err))
   
})

app.put("/update/:id", (req,res)=>{
    const id = req.params.id;
    UserModel.findByIdAndUpdate( { _id: id }, 
        { 
          name: req.body.name, 
          email: req.body.email, 
          age: req.body.age 
        }, )
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.delete("/deleteuser/:id", (req,res)=>{
    const id = req.params.id;
    UserModel.findByIdAndDelete({_id:id})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})


app.listen(port,()=>{console.log(`Server running on ${port}`)})