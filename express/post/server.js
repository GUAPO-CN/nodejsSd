var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({extended:false})

app.get('/index.html',function(req,res) {
    res.sendFile(__dirname+'/index.html')
})

app.post('/postform',urlencodedParser,function(req,res) {
    // 输出 JSON 格式
    var response = {
        'username':req.body.username,
        'password':req.body.password,
    }
    res.end(JSON.stringify(response))
})

var server = app.listen(8080,function() {
    var host = server.address().address
    var port = server.address().port
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
})