var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(function(request,response) {
    var pathname = url.parse(request.url).pathname;
	// 输出请求的文件名
	console.log("Request for " + pathname + " received.");

	fs.readFile(pathname.substr(1),function(err,data) {
		if(err){
			response.writeHead(404,{'Content-Type':'text/html'})
		}else{
			response.writeHead(200,{'Content-Type':'text/html'})
			response.write(data.toString());
		}
		response.end()
	})
}).listen(8080)

// 控制台会输出以下信息
console.log('Server running at http://127.0.0.1:8080/');
