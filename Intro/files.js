const fs= require("fs");

//Sync
// fs.writeFileSync('./text.js','console.log("Hello World")');

//Async
//fs.writeFileSync('./text.js','console.log("Hello Async")',(err)=>{});


// fs.readFile('./contacts.txt', 'utf-8', (err,res) => {
//     if(err){
//         console.log('error',err);
//     }
//     else{
//         console.log(res);
//     }
// });


// gets the current date
// fs.appendFileSync('./text.txt', new Date().getDate().toLocaleString())

//append
// fs.appendFileSync('./text.txt', 'hello\n')

//copy file
// fs.cpSync('./text.txt','copy.txt')

//delete
// fs.unlinkSync('./copy.txt')

// fs.mkdirSync('my-docs/a/b',{recursive:true})

