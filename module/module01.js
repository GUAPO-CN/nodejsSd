function fn01(){ //��дһ������ fn01
	console.log('module-fn01 ��һ��ģ��');
}
function fn02(){ //��дһ������ fn02
	console.log('module-fn02 ��һ��ģ��');
}
//��¶�ӿڣ�
module.exports={
	'fn01':fn01,
	'fn02':fn02,
}