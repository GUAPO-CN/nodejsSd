function fn01(){ //编写一个方法 fn01
	console.log('module-fn01 第一个模板');
}
function fn02(){ //编写一个方法 fn02
	console.log('module-fn02 第一个模板');
}
//暴露接口：
module.exports={
	'fn01':fn01,
	'fn02':fn02,
}