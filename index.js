const AdminJS = require('adminjs')
const AdminJSExpress = require('@adminjs/express')
const express = require('express')
const app = express();
const path=require("path");
const port = 3000 ;
const mongoose = require('mongoose')

const AdminJSMongoose = require("@adminjs/mongoose");
const User = require('./models/user');

AdminJS.registerAdapter({
    Resource: AdminJSMongoose.Resource,
    Database: AdminJSMongoose.Database,
  })


mongoose.set('strictQuery', true);



function mongooseConnection(){
    mongoose.connect('mongodb+srv://ala:20101998ala@cluster0.tqmkeb7.mongodb.net/?retryWrites=true&w=majority',(err,done)=>{
    if (err){
        console.log(err)
    }
    if (done){
        console.log('connexion avec succes')
    }
    })
}

function startServer(){
    mongooseConnection();

    const admin = new AdminJS({
        resources: [User]
    })

    

    const adminRouter = AdminJSExpress.buildRouter(admin)
    app.use(admin.options.rootPath, adminRouter)

    app.listen(port,()=>{
        console.log(`server a lecoute sur port ${port}`)
    })
}

startServer();


