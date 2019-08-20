const http = require('http');
const path = require('path');
const express =require('express');
const bodyParser = require('body-parser');

const unlencoderParser = bodyParser.urlencoded({extended:false});
const app = express();
// app.use(bodyParser.json())
app.use('/js',express.static('js'))
var  dataObj;

//设置所有请求的 跨域请求
app.all('*',function(req,res,next){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
})

app.get('/',(req,res) => {
	res.header("Content-Type", "text/html; charset=utf-8");
	res.sendFile(__dirname +'/index.html')
})

app.post('/bhgConfig',unlencoderParser,(req,res,next) => {
	const _req = req;
	const headersType = req.headers['content-type'];
	// console.log(headersType,'');
	if( headersType == 'application/x-www-form-urlencoded'){
		//处理form-data格式的数据 
			dataObj = eval('('+_req.body.json+')')
			initObj(dataObj,_req)
			var response = {
				'username':_req.body.userName,
				'textarea':dataObj,
			}
			res.end(JSON.stringify(response))
			return;
	}else if( headersType == 'application/json'){
		//处理payload格式的数据 用on data end
			let str = ''
			_req.on('data',(chunk)=>{
				str = chunk.toString();
				dataObj = eval('('+JSON.parse(str).json+')')
				initObj(dataObj,_req)
			})
			_req.on('end',()=>{
				var response = {
					'username':_req.body.userName,
					'textarea':dataObj,
				}
				res.end(JSON.stringify(response))
			})
			return;
	}

})

let server = app.listen(5555, () => {
    let host = server.address().address;
	let port = server.address().port;
	console.log("应用实例，访问地址为 http://%s:%s", host, port)
})

function initObj(obj,_req){
	// console.log(typeof obj,'');
	for(var key in obj){
		let value = obj[key];
		if(typeof value === 'object'){
			initObj(value,_req)
		}else{
			if(typeof value === 'function'){
				_req.header = _req.headers;
				let result = value({_req})
				// console.log(result,'initObj value result'); 
				obj[key] = result;
			}
		}
	}
}
