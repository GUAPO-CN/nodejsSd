var module01 = require("./module01.js"); //module01.js 的暴露对象 使用 变量 module01接收
var module02 = require("./module02.js"); //module02.js 的暴露对象 使用 变量 module02接收

module01.fn01(); //访问module01.js的方法
module02.fn02(); //访问module02.js的方法