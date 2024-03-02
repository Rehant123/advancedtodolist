const express = require("express");
const app = express();
const todolistSchema = require("../Models/taskModel");

const getalltasks = async (req, res) => {
    try {
        const getdata = await todolistSchema.find({});

        console.log(getdata)
        return res.status(200).json({ getdata });
    } catch (error) {
        console.error(error);
        if(error.name === 'ValidationError'){
            res.status(400).json({error:error.message});
        }
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

const getSingleTask = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await todolistSchema.findById(id);
        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }
        return res.status(200).json(task);
    } catch (error) {
        console.error("Error fetching task:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

const createtask = async (req, res) => {
    try {
        const task = await todolistSchema.create(req.body);
        res.status(200).json(task);
        console.log("successfully created and added to the database");
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        }
        return res.status(500).json({ error: "Internal Server Error" });
    }
}


const updatetask = async(req,res)=>{
    try{
        //findOneAndUpdate({condition},data that needs to be updated,{new:,runValidators})
        const {id:taskID} = req.params;
        console.log(taskID);
        const update = await todolistSchema.findOneAndUpdate({_id:taskID},req.body,{
            new:true,
            runValidators:true
        })
        if(!update){
            return res.status(404).json("can't find tasks with id")
        }
        return res.status(200).json(update);
    }catch(Error){
        console.log(Error)
    }
}


// Define other functions for update, delete, etc.

const deletetask = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const deletetask = await todolistSchema.findByIdAndDelete(id); // Corrected this line
        if (!deletetask) {
            return res.status(404).json({ error: "Task does not exist" }); // Changed the response to send a JSON object with an error key
        }
        return res.status(200).send("Successfully deleted");
    } catch (error) {
        console.log(error); // Logging the error for debugging purposes
        return res.status(500).json({ error: "Internal Server Error" }); // Sending a generic error response to the client
    }
}

const addtask  = async(req,res)=>{
   
    const {name} = req.body;
    if(!name){
        return res.status(404).send("please provide a task name");
    }
    console.log(name);
    try{
        const task = todolistSchema.create(req.body);
       return  res.status(201).json(task);
    }catch(error){
return res.status(500).json({error});
    }
}


module.exports = {getSingleTask, getalltasks, createtask,updatetask,deletetask ,addtask/* Add other functions here */ };
