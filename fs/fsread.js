var fs = require('fs');//node ����ģ���ֱ������  fs���ļ�ϵͳ����ģ��

fs.readFile("./a.txt","utf-8",function(err,data){  //��ȡ�ļ�
	if(err) throw err;   //һ������£������ȡ����������Ҫ�׳��쳣��ֹ����������Ҫ�������޸�����
 	console.log(err,data);
	//node ����ģ���ֱ������  fs���ļ�ϵͳ����ģ��
});