var http = require("http");
http.createServer(function(request,response){
	console.log("request going"); //����������ʵ�ʱ���ڿ���̨�ش�ӡ����Ϣ
    	response.end("haha");//��ʾ�����������������ظ������
}).listen(8888);