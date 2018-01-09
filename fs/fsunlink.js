var fs = require("fs"); //node 内置模块可直接引入  fs：文件系统操作模块

fs.unlink("./c.txt",function(err){  //删除文件
    if(err) throw err;
})