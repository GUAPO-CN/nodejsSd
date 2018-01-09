var fs = require("fs"); //node 内置模块可直接引入  fs：文件系统操作模块
fs.readFile("./a.txt","utf-8",function(err,data){  //读取文件
    if(err) throw err;
    console.log(data);
});
setTimeout(function(){
    console.log("定时器打印！");
},0);