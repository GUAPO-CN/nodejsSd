require('./mongoose')
const http = require('http');
const path = require('path');
const express =require('express');

const 	app = express(),
		configRoute = require('./routes/config');
//设置所有请求的 跨域请求
	app.all('*',function(req,res,next){
		res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild");
			res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
			res.header("X-Powered-By",' 3.2.1')
			res.header("Content-Type", "application/json;charset=utf-8");
			next();
	})
app.use('/js',express.static('js'))
app.use('/config',configRoute)
// app.use(bodyParser.json())


//获取首页 index.html展示
	app.get('/',(req,res) => {
		res.header("Content-Type", "text/html; charset=utf-8");
		res.sendFile(__dirname +'/index.html')
	})


let server = app.listen(5555, () => {
	let host = server.address().address;
	let port = server.address().port;
	console.log("应用实例，访问地址为 http://%s:%s", host, port)
})
