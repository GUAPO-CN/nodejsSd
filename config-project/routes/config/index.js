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
const ConfigDB = mongoose.connect('mongodb://localhost:27017/config',{useNewUrlParser:true});

// 每一个Schema对应MongoDB中的一个集合（collection）。Schema中定义了集合中文档（document）的格式。
var ConfigSchema = new mongoose.Schema({
	userId:{
		type:Number,
		required:true
	},
	project:Number,
	method:String,
	url:String,
	mode:String,
	description:String,
	creat_time:{
		type:Date,
		default:Date.now
	},
	update_time:{
		type:Date,
		default:Date.now
	},
},{
	autoIndex:true,
	id:true,
	_id:true,
	versionKey:false,
	timestamps:{createdAt:'creat_time',updatedAt:'update_time'}
})
//访问config库中的configList集合
const ConfigLists = mongoose.model('configList',ConfigSchema);

//新增 配置
router.post('/add',unlencoderParser,(req,res,next) => {
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
		//插入数据库
			const newConfigs = new ConfigLists({
				userId:0,
				project:1,
				method:'post',
				url:'/addConfig',
				mode:JSON.stringify(dataObj),
				description:'暂时写死',
			})
			ConfigLists.find({project:2},(err,docs)=>{
				if(docs.length>0){
					res.end(JSON.stringify({isSuccess:false,message:'已存在'}))
				}else{
					newConfigs.save( err =>{
						console.log(err,'error');
						const datas = err ? {isSuccess:false}:{isSuccess:true,message:'新增成功',data:response}
						//返回至浏览器
							res.end(JSON.stringify(datas))
					})
				}
			})
		return;
	}else if( headersType == 'application/json'){
		let str = ''
		_req.on('data',(chunk)=>{
			//处理payload格式的数据 用on data end
				str = chunk.toString();
				dataObj = eval('('+JSON.parse(str).json+')')
				initObj(dataObj,_req)
		})
		_req.on('end',()=>{
			var response = {
				'username':_req.body.userName,
				'textarea':dataObj,
			}
			console.log(JSON.stringify(dataObj),'dataObj');
			//插入数据库
				const newConfigs = new ConfigLists({
					userId:0,
					project:1,
					method:'post',
					url:'/addConfig',
					mode:JSON.stringify(dataObj),
					description:'暂时写死',
				})
				const name = _req.body.name;
				ConfigLists.find({project:2},(err,docs)=>{
					if(docs.length>0){
						res.end(JSON.stringify({isSuccess:false,message:'已存在'}))
					}else{
						newConfigs.save( err =>{
							console.log(err,'error');
							const datas = err ? {isSuccess:false}:{isSuccess:true,message:'新增成功',data:response}
							//返回至浏览器
								res.end(JSON.stringify(datas))
						})
					}
				})
		})
		return;
	}
})
//查询配置项
router.get('/list',(req,res)=>{
	console.log(req.query,'getConfig');
	ConfigLists.find(req.query,(err,docs)=>{
		if(docs.length > 0) {
			res.send({isSuccess: true, message: 'success',data:docs})
		} else {
			res.send({isSuccess: false, message: 'error',data:[]})
		}
	})
})
//删除配置项
router.get('/delete',(req,res)=>{
	console.log(req.query,'getConfig');
	ConfigLists.remove(req.query,(err,docs) =>{
		console.log(docs,'');
		if(docs.ok > 0){
			res.send({isSuccess: true, message: 'success'})
		}else{
			res.send({isSuccess: false, message: 'error'})
		}
	})
})
//更新配置项
router.get('/update',(req,res)=>{
	console.log(req.query,'getConfig');
	ConfigLists.update({'project':req.query.project},{$set:req.query},(err,rawResponse) =>{
		console.log(rawResponse,'');
		if(rawResponse.nModified > 0){
			res.send({isSuccess: true, message: 'success'})
		}else{
			res.send({isSuccess: false, message: 'error'})
		}
	})
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