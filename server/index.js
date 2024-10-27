const express=require("express");
const app=express();
const mongoose=require("mongoose");
var cors=require('cors');
const bodyParser=require('body-parser');
const userRouter=require("./routes/userRouter");
mongoose.connect("mongodb://127.0.0.1:27017/JSONWebToken").then(()=>{
    console.log("DataBase Connected!!!")
})

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use(cors());
app.use("/user",userRouter);

app.listen(8080,()=>{
    console.log("Sever Run on 8080!!")
});