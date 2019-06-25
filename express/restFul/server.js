var express = require('express')
var fs = require('fs')

var app =express()
//添加的新用户数据
var user = {
    "user4" : {
       "name" : "mohit",
       "password" : "password4",
       "profession" : "美鬼子",
       "id": 4
    },
    "user5" : {
       "name" : "mohit",
       "password" : "password5",
       "profession" : "小日本",
       "id": 5
    },
 }

app.get('/list',function(req,res) {
    fs.readFile(__dirname+'/user.json','utf8',function(err,data) {
        // res.setHeader('Content-Type','text/html;charset=utf8')
        res.setHeader('Content-Type','text/plain;charset=utf8')
        res.end(data)
    })
})

app.get('/addUser',function(req,res) {
    fs.readFile(__dirname+'/user.json','utf8',function(err,data) {
        data = JSON.parse(data)
        data['user4'] = user['user4'];
        res.setHeader('Content-Type','text/plain;charset=utf8')
        res.end(JSON.stringify(data))
    })
})

app.get('/deleteUser/:id',function(req,res) {
    fs.readFile(__dirname+'/user.json','utf8',function(err,data) {
        data = JSON.parse(data)
        delete data['user'+req.params.id];
        res.setHeader('Content-Type','text/plain;charset=utf8')
        res.end(JSON.stringify(data))
    })
})

app.get('/:id',function(req,res) {
    fs.readFile(__dirname+'/user.json','utf8',function(err,data) {
        data = JSON.parse(data)
        var user = data['user'+req.params.id];
        res.setHeader('Content-Type','text/plain;charset=utf8')
        res.end(JSON.stringify(user))
    })
})



var server = app.listen(8080,function() {
    var host = server.address().address
    var port = server.address().port
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
})