var http = require("http");//����httpģ��
var fs = require("fs"); //����fsģ��

http.createServer(function(request,response){
    
    fs.readFile("./a.txt","utf-8",function(err,data){  //��ȡ�ļ�
       if(err) throw err;
       response.end(data);//��ʾ�����������������ظ������
   });

}).listen(3000);