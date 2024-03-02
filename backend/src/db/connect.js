const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = (url)=>{
    return mongoose.connect(url).then(()=>{
        console.log("Connected to the DATABASE .... ")
    }).catch(error=>{
        console.log(error);
    })
}

module.exports = connectDB;