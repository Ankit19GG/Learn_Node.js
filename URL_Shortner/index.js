const express = require("express");
const app = express();
const urlRoute=require('./Routers/url');
const PORT = 8010;
const {connectToMongoDb}=require('./connections');

app.use(express.json());

connectToMongoDb("mongodb://127.0.0.1:27017/short-url")
.then(()=>console.log('Mongodb Connected'))


app.use("/",urlRoute)

app.listen(PORT,()=>console.log(`Server Started at PORT: ${PORT}`));

