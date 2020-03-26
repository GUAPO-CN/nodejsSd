const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser'),
				unlencoderParser = bodyParser.urlencoded({extended:false});
const mongoose = require('mongoose');

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
const ConfigDB = mongoose.connect(global.mongodbUrl+'/config',{useNewUrlParser:true});

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
	// const headersType = _req.headers['content-type'];
	const headersType = _req.get('content-type');
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
		var str = '',dataObj='';
		//处理payload格式的数据 用on data end
		_req.on('data',(chunk)=>{
			// console.log(chunk,'chunk')
			str = chunk.toString();
			// console.log(str,'str')
			dataObj = JSON.parse(str).json;
			// console.log(dataObj,'dataObj')
																																													//处理dataObj
																																													// initObj(dataObj,_req)
																																													// console.log(JSON.stringify(dataObj),'dataObj');
		})
		_req.on('end',()=>{
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
					mode:dataObj,
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
	console.log( req.headers,'domian')
	console.log( req.originalUrl,'originalUrl')
	console.log( req.subdomains,'subdomains')
	console.log( req.baseUrl,'baseUrl')
	ConfigLists.find(req.query,(err,docs)=>{
		if(err) return res.send({isSuccess: false, message: 'error',data:false});
		const sendArr = [];
		if(docs.length > 0) {
			docs.forEach((item,index) => {
				// console.log(typeof item,'item 为object');

				// console.log(typeof item.mode,'item.mode 为string');
				let itemMode= eval('('+item.mode+')');
				// console.log(typeof itemMode,'itemMode 为object');

				// console.log(typeof itemMode.json,'itemMode.json 为string');
				// let itemModeJson= eval('(' + itemMode.json + ')');
				// console.log(typeof itemModeJson,'itemModeJson 为object');

				sendArr.push(item);
				if(itemMode){
					let itemModeJsonRun = initObj(itemMode,req);
					sendArr[index]['modes'] = itemModeJsonRun;
				}
			})
		}
		res.send({isSuccess: true, message: 'success',data:sendArr});
	}).lean();
})

function initObj(obj,_req){
	// console.log(typeof obj,'init obj');
	for(var key in obj){
		let value = obj[key];
		// console.log(key,'init key')
		if(typeof value === 'object'){
			obj[key] = initObj(value,_req)
		}else{
			if(typeof value === 'function'){
				// _req.headers['origin'] = (_req.headers['origin'] ?_req.headers['origin'] : _req.headers['referer']) ;

				// _req.header = _req.headers;
				// let domain = _req.headers['referer'].match(/^(\w+:\/\/)?([^\/]+)/i);
				// domain = domain ? domain[2].split(':')[0].split('.').slice(-2).join('.') : null;
				// console.log( _req.headers,'domian')
				// console.log(_req.header,'_req.header');
				// console.log(_req.ip.match(/\d+\.\d+\.\d+\.\d+/),'_req.ip');
				// console.log(_req.get('Origin'),'_req.header');
				if(!_req.header || !_req.header.origin){
					obj[key] = '没有origin'
					return 
				}else{
					let result = value({_req})
					// console.log(result,'initObj value result'); 
					obj[key] = result;
				}
			}
		}
	}
	return obj;
}


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

module.exports = router