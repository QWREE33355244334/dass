const express= require("express");
const morgan=require("express");

const app=new express();
app.use(morgan('dev'));
app.use(express.json());
let tasks =[];
app.get('/',(req,res)=>{
    res.json(tasks);
})
app.post('/tasks',(req,res)=>{
    tasks.push(req.body);
    res.send({mesage:"tasks added"  ,tasks})
})
app.get('/tasks/:id',(req,res)=>{
    const id=req.params.id;
    const task=tasks.find(task=>task.id==id)
    if(!task){
        res.send("task not found");
    }else{
        res.json(task)
    }
})
app.put('/tasks/:id',(req,res)=>{
    const id= req.params.id;
    const updatedtask=req.body;
    const index=tasks.findIndex((task)=>task.id===id);
    if(index===-1){
        res.send("task not found")
    }else{
        tasks.splice(index,1,updatedtask);
        res.json(tasks)
    }
})
app.delete('/tasks/:id',(req,res)=>{
    const id=req.params.id
    const index=tasks.find((task)=>task.id===id)
    if(index===-1){
        console.log("it is not present")

    }else{
        tasks.splice(index,1);
        res.send("element is deleted")
        console.log("deleted")
    }
})

app.listen(3005,(req,res)=>{
    console.log("server ready")
})