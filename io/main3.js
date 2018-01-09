var fs = require("fs");

var  data = "";  //声明一个空字符串来存读取的数据
var rs = fs.createReadStream("a.txt");

rs.setEncoding("utf-8");

//监听当有数据流入的时候
rs.on("data",function(chunc){
    data += chunc;       //将读取的数据拼接到data上。
    console.log("..."); //读的过程中，我们打印三个点。
});

rs.on("end",function(){
    console.log("没有数据了")
});