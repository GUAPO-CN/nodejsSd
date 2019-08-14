var express = require('express');
// 创建服务器
var app = express();
 
// 监听客户端的请求
app.get('/', function (req, res) {
   res.send('Hello World');
})
 
// 启动服务器
var server = app.listen(8081, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})

// app.listen = function listen() {
//   var server = http.createServer(this);
//   return server.listen.apply(server, arguments);
// };