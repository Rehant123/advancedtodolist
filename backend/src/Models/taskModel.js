const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "must provide a name"],
        maxlength:[20,"should be between 5-20 characters"],
        minlength:[3,"should be between 5-20 characters"],
        trim:true
    },
    completed:{
        type:Boolean,default:false
    }
})


module.exports = mongoose.model("todolist",todoSchema,"todolist");