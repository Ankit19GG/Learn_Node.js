const express = require("express");
const path=require('path')
const app = express();
const urlRoute=require('./Routers/url');
const PORT = 8010;
const {connectToMongoDb}=require('./connections');
const URL=require('./models/url');

app.use(express.json());

app.set("view engine","ejs");
app.set("views",path.resolve('./view'));

app.get("/test",async (req,res)=>{
   const allUrls=await URL.find({});
   return res.render('home',{urls:allUrls});
});

connectToMongoDb("mongodb://127.0.0.1:27017/short-url")
.then(()=>console.log('Mongodb Connected'))


app.use("/",urlRoute)

app.listen(PORT,()=>console.log(`Server Started at PORT: ${PORT}`));

