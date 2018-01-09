var fs = require("fs");//node 内置模块可直接引入  fs：文件系统操作模块

fs.mkdir("creatFile",function(err){   //创建 c 文件
	 if(err) throw err;
})