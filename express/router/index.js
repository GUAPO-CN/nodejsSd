var express = require('express')
// 创建服务器
var app =express()

var birds = require('./birds')
app.use('/birds', birds)

app.get('/',function(req,res) {
    res.send('index page')
})

app.listen(8888,function() {
    console.log('express server running at http://127.0.0.1:8888')
})



