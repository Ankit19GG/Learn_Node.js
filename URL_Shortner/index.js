const express = require("express");
const path=require('path')
const app = express();
const PORT = 8010;
const {connectToMongoDb}=require('./connections');
const URL=require('./models/url');
const cookieParser=require('cookie-parser');
const {restrictToLoggedinUser}=require('./middlewares/auth');

const urlRoute=require('./Routers/url');
const staticRouter=require('./Routers/staticrouters');
const userRoute=require('./Routers/user');


app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());




app.set("view engine","ejs");
app.set("views",path.resolve('./view'));



connectToMongoDb("mongodb://127.0.0.1:27017/short-url")
.then(()=>console.log('Mongodb Connected'));



app.use("/url",restrictToLoggedinUser,urlRoute);
app.use("/",staticRouter);
app.use("/users",userRoute)



app.listen(PORT,()=>console.log(`Server Started at PORT: ${PORT}`));

