var fs = require('fs');

fs.readFile("./a.txt","utf-8",function(err,data){
	if(err) throw err;
	fs.writeFile("./b.txt",data,function(err){
		if(err) throw err;
	})
});