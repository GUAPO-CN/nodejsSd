var fs = require('fs');//node 内置模块可直接引入  fs：文件系统操作模块

fs.readFile("./a.txt","utf-8",function(err,data){  //读取文件
	if(err) throw err;   //一般情况下，如果读取出错我们需要抛出异常终止程序。所以需要将代码修改如下
 	console.log(err,data);
	//node 内置模块可直接引入  fs：文件系统操作模块
});