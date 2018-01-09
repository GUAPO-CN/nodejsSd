


var fs = require("fs"); //node 内置模块可直接引入  fs：文件系统操作模块




for(var i=0;i<10;i++){
	fs.mkdir(''+i,function(err){  //创建 c 文件
    		if(err) throw err;
	})
}