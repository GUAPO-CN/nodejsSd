var fs = require("fs"); //node ����ģ���ֱ������  fs���ļ�ϵͳ����ģ��

fs.unlink("./c.txt",function(err){  //ɾ���ļ�
    if(err) throw err;
})