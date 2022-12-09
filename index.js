const express = require('express')
const app = express();
const path=require("path");
const port = 3000 ;
const mongoose = require('mongoose')
mongoose.set('strictQuery', true);

mongoose.connect('mongodb+srv://ala:20101998ala@cluster0.tqmkeb7.mongodb.net/?retryWrites=true&w=majority',(err,done)=>{
if (err){
    console.log(err)
}
if (done){
    console.log('connexion avec succes')
}
})




app.listen(port,()=>{
    console.log(`server a lecoute sur port ${port}`)
})