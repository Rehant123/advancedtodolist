const express = require("express");
const { getalltasks,getSingleTask,createtask,updatetask,deletetask,addtask} = require("../controller/taskscontroller");

const router = express.Router();

router.get("/", getalltasks);
router.post("/", addtask)
router.delete("/:id",deletetask)
router.route("/:id")
    .get(getSingleTask)
    .patch(updatetask)
   

module.exports = router;
