


var fs = require("fs"); //node ����ģ���ֱ������  fs���ļ�ϵͳ����ģ��




for(var i=0;i<10;i++){
	fs.mkdir(''+i,function(err){  //���� c �ļ�
    		if(err) throw err;
	})
}