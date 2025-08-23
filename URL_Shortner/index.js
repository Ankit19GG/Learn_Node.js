const express = require("express");
const path=require('path')
const app = express();
const PORT = 8010;
const {connectToMongoDb}=require('./connections');
const URL=require('./models/url');

const urlRoute=require('./Routers/url');
const staticRouter=require('./Routers/staticrouters');
const userRoute=require('./Routers/user');


app.use(express.json());
app.use(express.urlencoded({extended: false}));



app.set("view engine","ejs");
app.set("views",path.resolve('./view'));



connectToMongoDb("mongodb://127.0.0.1:27017/short-url")
.then(()=>console.log('Mongodb Connected'));



app.use("/url",urlRoute);
app.use("/",staticRouter);
app.use("/users",userRoute)



app.listen(PORT,()=>console.log(`Server Started at PORT: ${PORT}`));

