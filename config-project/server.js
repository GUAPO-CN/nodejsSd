const http = require('http');
const express =require('express');
const bodyParser = require('body-parser');

const unlencoderParser = bodyParser.urlencoded({extended:false});
const app = express();
var  dataObj;

app.get('/',(req,res) => {
	res.sendFile(__dirname +'/index.html')
})

function initObj(obj,_req){
	for(var key in obj){
		let value = obj[key];
		if(typeof value === 'object'){
			initObj(value,_req)
		}else{
			if(typeof value === 'function'){
				_req.header = _req.headers;
				let result = value({_req})
				console.log(result,'initObj value result'); 
				obj[key] = result;
			}
		}
	}
}

app.post('/bhgConfig',unlencoderParser,(req,res) => {
  dataObj = eval('('+req.body.json+')')
	const _req = req;
	initObj(dataObj,_req)

	var response = {
		'username':req.body.userName,
		'textarea':dataObj,
	}
	res.end(JSON.stringify(response))
})


let server = app.listen(5555, () => {
    let host = server.address().address;
	let port = server.address().port;
	console.log("应用实例，访问地址为 http://%s:%s", host, port)
})
