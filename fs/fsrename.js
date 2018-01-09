var fs = require("fs"); //node 内置模块可直接引入  fs：文件系统操作模块

fs.rename("c","c rename to d",function(err){  //将c 文件夹名字 改为  d
    if(err) throw err;
})