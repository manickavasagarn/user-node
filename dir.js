// async function dirlist() {
//     try {
//         const fs = require("fs"); 
//         var list= await fs.readdir("D:\ace-data-quality");
//         console.log(list);
//     } catch (error) {
//         console.log(error);
//     }
// }
// dirlist();



 const fs = require("fs");
// fs.readdir("D:\ace-data-quality",function(err,data){
//     if(err) throw err;
//     console.log(data);
// });




fs.readdir("D:\\ace-data-quality",function(err,list){
    if(err) throw err;
    list.map((ele)=>{
        if(ele.isFile()){
            console.log("file");
        }else{
            console.log("not a file");
        }
    })
})