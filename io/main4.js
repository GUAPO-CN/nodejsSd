var fs = require("fs");

var rs = fs.createReadStream("a.txt");
var ws = fs.createWriteStream("b.txt"); //写入流
rs.setEncoding("utf-8");

//监听当有数据流入的时候
rs.on("data",function(chunc){
    console.log("..."); //读的过程中，我们打印三个点。
    ws.write(chunc,"utf-8"); //向文件写入东西
});


rs.on("end",function(){
    console.log("修改mai3.js中的代码为如下，增加了下面代码的  4/10/16行，4行表示建立一个写入流（如果写入的文件不存在，会自动创建一个文件），10行表示往文件写入东西，16行表示关闭写入流。----没有数据了");
    ws.end();                 //关闭写入流
});