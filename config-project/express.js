var express = require('express')
var app = express()

var bodyParser = require('body-parser')

app.use('/public',express.static('public'))
app.use(bodyParser.urlencoded({extended:false}))

app.get('/index.html',function(req,res) {
    res.sendFile(__dirname + '/index.html')
})

var server = app.listen(6666,function(params) {
    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)
})