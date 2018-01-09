var http = require("http");
http.createServer(function(request,response){
	console.log("request going"); //当浏览器访问的时候，在控制台回打印此消息
    	response.end("haha");//表示请求结束，将结果返回给浏览器
}).listen(8888);