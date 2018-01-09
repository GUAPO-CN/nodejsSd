var fs = require("fs"); //node 内置模块可直接引入  fs：文件系统操作模块

fs.rename("c.txt","c rename to d.txt",function(err){  //将a.txt 改为  d.txt
    if(err) throw err;
})