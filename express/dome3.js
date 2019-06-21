var express = require('express');
var app = express();

app.use('/public',express.static('public'))

app.get('/',function(req,res) {
    res.send('hell o world ')
})

var server = app.listen(6565,function() {
    var host = server.address().address 
    var port = server.address().port 

    console.log('路径为http://%s:%s',host,port);
})
