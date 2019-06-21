var express = require('express')
var app = express()
app.use('/public', express.static('public'));

app.get('/index.html',function(req,res) {
    res.sendFile(__dirname + '/index.html')
})

app.get('/getform',function(req,res) {
    var response = {
        'username':req.query.username,
        'password':req.query.password,
    }
    res.end(JSON.stringify(response))
})


var server = app.listen(6565,function() {
    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)
})