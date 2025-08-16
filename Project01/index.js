const express=require("express");
const app=express();
const fs=require("fs");
const { connectMongoDb }=require('./connection');
const PORT=8100;
const userRouter=require('./routers/user');
const { logReqRes } = require("./middlewares");

//connection
connectMongoDb("mongodb://127.0.0.1:27017/Project01");

//Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("log.txt"));

//routes
app.use('/api/users',userRouter);

app.listen(PORT, ()=>console.log(`Server Started Port: ${PORT}`));
