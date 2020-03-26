require('./mongoose');
const http = require('http');
const path = require('path');
const express =require('express');

const	app = express(),
		configRoute = require('./routes/config');
		userRoute = require('./routes/user');
//设置所有请求的 跨域请求
	app.all('*',function(req,res,next){
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Content-Type, Origin, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild");
		res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
		res.header("X-Powered-By",' 3.2.1')
		res.header("Content-Type", "application/json;charset=utf-8");
		next();
	})
	// app.use(bodyParser.json()) //针对post请求，body处理

//使用
	app.use('/js',express.static(path.join(__dirname ,'../web/js')))
	app.use('/config',configRoute)
	app.use('/user',userRoute)

//获取首页 index.html展示
	app.get('/',(req,res) => {
		res.header("Content-Type", "text/html; charset=utf-8");
		res.sendFile(path.join(__dirname ,'../web/index.html'))
	})

//启动服务
let server = app.listen(5555, () => {
	let host = server.address().address;
	let port = server.address().port;
	console.log("应用实例，访问地址为 http://%s:%s", host, port)
})
