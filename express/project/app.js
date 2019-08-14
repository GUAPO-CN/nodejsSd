var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.locals.title = 'My App';
// console.log(app.locals,'locals');

// view engine setup
//设置views的文件夹
app.set('views', path.join(__dirname, 'views'));
//设置express.js所使用的render engine
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//加载路由
app.use('/', indexRouter);
app.use('/users', usersRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log(req.baseUrl,'404');
  next(createError(404));
});



//加载错误处理解决办法
//app.use挂载中间件方法到路径上。如果路径未指定，那么默认为"/"
app.use(function(err, req, res, next) {
  console.log(err,'err');
  console.log(err.status,'err');
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
