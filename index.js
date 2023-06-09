const express = require("express");
const app=express();

const fs = require("fs");

const cors=require("cors");
let option = {
    origin : "*"
}
app.use(cors(option));

app.get("/test",function(req,res){
    var time = Date.now();
   
    let date_time = new Date();
    let dates = ("0" + date_time.getDate()).slice(-2);
    let seconds = date_time.getSeconds();


    fs.writeFile(`path/${dates}_${seconds}.txt`,`${time}`,function(err){
        if(err){
            throw err;
        } 
        res.json({message:"created succssfuly!"});
    })
})
app.get("/read",function(req,res){

       fs.readdir("path",function(err,data){
            console.log(data)
            res.json(data.map((ele)=>{return {"name":ele}}));
       })
    
})
app.listen(3001);