const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser'),
				unlencoderParser = bodyParser.urlencoded({extended:false});
const mongoose = require('mongoose');
var dataObj;

//设置所有请求的 跨域请求 server.js已经全局设置
// router.all('*',function(req,res,next){
// 	res.header("Access-Control-Allow-Origin", "*");
// 		res.header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild");
// 		res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
// 		res.header("X-Powered-By",' 3.2.1')
// 		res.header("Content-Type", "application/json;charset=utf-8");
// 		next();
// })


// 连接的是我本地数据库中的config库
mongoose.connect('mongodb://localhost:27017/config')

// 每一个Schema对应MongoDB中的一个集合（collection）。Schema中定义了集合中文档（document）的格式。
var ConfigSchema = new mongoose.Schema({
	
})

//新增 配置
router.post('/addConfig',unlencoderParser,(req,res,next) => {
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

//查询配置项
router.get('/getConfig',(req,res)=>{

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

module.exports = router