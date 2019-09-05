const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser'),
				unlencoderParser = bodyParser.urlencoded({extended:false});
const mongoose = require('mongoose');

// 连接的是我本地数据库中的config库
const ConfigDB = mongoose.connect('mongodb://localhost:27017/config',{useNewUrlParser:true,useCreateIndex: true});

// 每一个Schema对应MongoDB中的一个集合（collection）。Schema中定义了集合中文档（document）的格式。
var ConfigSchema = new mongoose.Schema({
	userId:{
    type:Number,
    index:true,
    unique:true,
		// required:true,
	},
	// project:Number,
	// method:String,
	// url:String,
	// mode:String,
	// description:String,
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
	// id:true,
	_id:true,
	versionKey:false,
	timestamps:{createdAt:'creat_time',updatedAt:'update_time'}
})
//访问config库中的configList集合
const Users = mongoose.model('user',ConfigSchema);

//查询配置项
router.get('/',(req,res)=>{
  const newUsers = new Users({
		userId:0
  })
  newUsers.save( err =>{
    res.send({isSuccess: true, message: 'success'})
  })
})

module.exports = router