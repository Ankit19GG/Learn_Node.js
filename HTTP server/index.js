const http=require("http");
const fs=require("fs");
const url=require("url");

const express=require("express");

const app=express();

app.get('/',(req,res)=>{
    return res.send("Hello this is the Home page!");
})

app.get('/about',(req,res)=>{
    return res.send("Hello this is the about page!")
})

// function myhandler(req,res){
//     const log=`${Date.now()}:${req.url} New request received\n`
//     const myurl=url.parse(req.url)
//     console.log(myurl.query)
//     fs.appendFile("log.txt",log,(err,data)=>{
//         if(err){
//             console.log("Error:", err)
//         }
//         else{
//         switch(req.url){
//             case '/':res.end("This is the Home page");
//             break;
//             case '/contactus':res.end("This is contact page");
//             break;
//             case '/accounts':res.end("This is the account section");
//             break;
//             default: res.end("Error: 404 Page not found!")
//         }}
//     })  
// }

const Servu= http.createServer(app);

Servu.listen(8100,()=>{console.log("Server Started!")}) 