var fs = require("fs"); //node ����ģ���ֱ������  fs���ļ�ϵͳ����ģ��

fs.rename("c","c rename to d",function(err){  //��c �ļ������� ��Ϊ  d
    if(err) throw err;
})