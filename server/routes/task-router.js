
import express from 'express'

const router = express.Router();

import Task from '../models/Task'

//create a task
router.post("/", async (req,res) => {
    const newTask = new Task(req.body)
    try{
        const savedTask = await newTask.save();
        res.status(200).json(savedTask)
    }catch(err){
        res.status(500).json(err)
    }
})

//update a task
router.put("/:id", async (req,res) => {

    try{
        const task = await Task.findById(req.params.id);

        if ( task.taskId === req.body.taskId ){
            await task.updateOne( { $set : req.body });  
            res.status(200).json("The Task Has Been Updated!!")
        }else{
            res.status(403).json("Can't Update")
        }
    }catch(err){
        res.status(500).json(err)
    }
})


//delete a task
router.delete("/:id", async (req,res) => {

    try{
        const task = await Task.findById(req.params.id);

        if ( task.taskId === req.body.taskId ){
            await task.deleteOne();  
            res.status(200).json("Task Deleteeed!!")
        }

    }catch(err){
        res.status(500).json(err)
    }
})


//get all taks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;