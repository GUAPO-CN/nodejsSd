var express = require('express')
var cookieParser = require('cookie-parser')
var util = require('util')

var app = express()
app.use(cookieParser())

app.get('/',function(req,res) {
    console.log(util.inspect(req.cookies) +'request cookies');
})

app.listen(8080)