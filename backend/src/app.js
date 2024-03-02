const express = require('express');
const connectDB = require('./db/connect');
const app = express();
const port = 3000;
const cors = require("cors");
//import router that will handle get post update delete
const tasks = require("./routes/taskroute");
app.use(express.json());
app.use(cors());
app.get("/",(req,res)=>{
    res.send("hi how are you dear")
});

app.use("/v1/tasks",tasks);


const start  = async()=>{
  try{
    await connectDB(process.env.MONGO_URL);

    app.listen(port, () => {  
      console.log(`Server is running on http://localhost:${port}`);
    });
    
  }catch(Error){
console.log(Error);
  }
}
start();