var fs = require("fs"); //node ����ģ���ֱ������  fs���ļ�ϵͳ����ģ��

fs.rename("c.txt","c rename to d.txt",function(err){  //��a.txt ��Ϊ  d.txt
    if(err) throw err;
})