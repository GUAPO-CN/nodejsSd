var http = require("http");//引入http模块
var fs = require("fs"); //引入fs模块

http.createServer(function(request,response){
    
    fs.readFile("./a.txt","utf-8",function(err,data){  //读取文件
       if(err) throw err;
       response.end(data);//表示请求结束，将结果返回给浏览器
   });

}).listen(3000);