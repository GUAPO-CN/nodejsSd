var express = require('express');
var router = express.Router();

/* GET index page. */
router.get('/', function(req, res, next) {
	res.render('index', {
		title: 'index'
	}); // 到达此路径则渲染index文件，并传出title值供 index.html使用
});

router.post('/index/list', function(req, res) {
	/*GET ALL works*/
	var works = global.dbHandel.getModel('works');
	var _name = req.body.name;
	var o = {};
	if (_name) {
		o = {$or: [ //多条件，数组
            {name : {$regex : new RegExp(_name, 'i')}}
        ]};
	};
	console.log(_name);
	works.find(o, function(err, doc) {
		req.session.user = doc;
		return res.json(doc);
	})
})

router.route("/detail/:id").get(function(req, res) {
	res.render('detail', {
		title: 'detail'
	});
});

router.post("/info",function(req, res, next){
	var works = global.dbHandel.getModel('works');
	var _id = req.body.id;
	works.findOne({_id:_id},function(err, doc) {
		req.session.user = doc;
		res.send(doc);
	})
})

/* GET login page. */
router.route("/login").get(function(req, res) { // 到达此路径则渲染login文件，并传出title值供 login.html使用
	res.render("login", {
		title: 'User Login'
	});
}).post(function(req, res) { // 从此路径检测到post方式则进行post数据的处理操作
	//get User info
	//这里的User就是从model中获取user对象，通过global.dbHandel全局方法（这个方法在app.js中已经实现)
	var User = global.dbHandel.getModel('user');
	var uname = req.body.uname; //获取post上来的 data数据中 uname的值
	User.findOne({
		name: uname
	}, function(err, doc) { //通过此model以用户名的条件 查询数据库中的匹配信息
		if (err) { //错误就返回给原post处（login.html) 状态码为500的错误
			res.send(500);
			console.log(err);
		} else if (!doc) { //查询不到用户名匹配信息，则用户名不存在
			req.session.error = '用户名不存在';
			res.send(404); //	状态码返回404
			//	res.redirect("/login");
		} else {
			if (req.body.upwd != doc.password) { //查询到匹配用户名的信息，但相应的password属性不匹配
				req.session.error = "密码错误";
				res.send(404);
				//	res.redirect("/login");
			} else { //信息匹配成功，则将此对象（匹配到的user) 赋给session.user  并返回成功
				req.session.user = doc;
				res.send(doc);
				//	res.redirect("/home");
			}
		}
	});
});

/* GET register page. */
router.route("/register").get(function(req, res) { // 到达此路径则渲染register文件，并传出title值供 register.html使用
	res.render("register", {
		title: 'User register'
	});
}).post(function(req, res) {
	//这里的User就是从model中获取user对象，通过global.dbHandel全局方法（这个方法在app.js中已经实现)
	var User = global.dbHandel.getModel('user');
	var uname = req.body.uname;
	var upwd = req.body.upwd;
	User.findOne({
		name: uname
	}, function(err, doc) { // 同理 /login 路径的处理方式
		if (err) {
			res.send(500);
			req.session.error = '网络异常错误！';
			console.log(err);
		} else if (doc) {
			req.session.error = '用户名已存在！';
			res.send(500);
		} else {
			User.create({ // 创建一组user对象置入model
				name: uname,
				password: upwd
			}, function(err, doc) {
				if (err) {
					res.send(500);
					console.log(err);
				} else {
					req.session.error = '用户名创建成功！';
					res.send(200);
				}
			});
		}
	});
});

/* GET add work page. */
router.route("/addwork").get(function(req, res) { // 到达此路径则渲染register文件，并传出title值供 register.html使用
	res.render("addWork", {
		title: 'add work'
	});
}).post(function(req, res) {
	//这里的User就是从model中获取user对象，通过global.dbHandel全局方法（这个方法在app.js中已经实现)
	var Work = global.dbHandel.getModel('works');
	var name = req.body.name;
	var address = req.body.address;
	var description = req.body.description;
	var type = req.body.type;
	var image_url = req.body.image_url;
console.log(name);
	Work.create({ // 创建一组user对象置入model
		name: name,
		address: address,
		description: description,
		type: type,
		image_url: image_url
	}, function(err, doc) {
		if (err) {
			res.send(500);
			console.log(err);
		} else {
			req.session.error = 'add work success！';
			res.send(200);
		}
	});

});

/* GET home page. */
router.get("/home", function(req, res) {
	if (!req.session.user) { //到达/home路径首先判断是否已经登录
		req.session.error = "请先登录"
		res.redirect("/login"); //未登录则重定向到 /login 路径
	}
	res.render("home", {
		title: 'Home'
	}); //已登录则渲染home页面
});

/* GET logout page. */
router.get("/logout", function(req, res) { // 到达 /logout 路径则登出， session中user,error对象置空，并重定向到根路径
	req.session.user = null;
	req.session.error = null;
	res.redirect("/");
});


/* leave a message */
router.post("/leaveMessage",function(req, res, next){
	var messageModel = global.dbHandel.getModel('message');
	var name = req.body.name;
	var description = req.body.description;
	var workId = req.body.workId;
	
	messageModel.create({ // 创建一组user对象置入model
		name: name,
		description: description,
		workId: workId
	}, function(err, doc) {
		if (err) {
			res.send(500);
			console.log(err);
		} else {
			req.session.error = 'leave a message success！';
			res.send(200);
		}
	});
})


/*GET message list*/
router.post("/messageList",function(req, res, next){
	var messageModel = global.dbHandel.getModel('message');
	var _id = req.body.workId;
	console.log(_id);
	var messageQuery = messageModel.find();
	messageQuery.where('workId',_id).exec(function (err, doc) {
		req.session.user = doc;
		return res.json(doc);
	});
})

/* worker resume */
router.route("/resume/:id").get(function(req, res) { // 到达此路径则渲染resume文件，并传出title值供 resume.html使用
	res.render("resume", {
		title: 'resume'
	});
})

/* add worker resume */
router.route("/addResume").get(function(req, res) { // 到达此路径则渲染addResume文件，并传出title值供 addResume.html使用
	res.render("addResume", {
		title: 'Add resume'
	});
})

/* Get resume list */
router.post("/resume/List",function(req, res, next){
	var resumeModel = global.dbHandel.getModel('personResume');
	var _name = req.body.name;
	var o = {};
	if (_name) {
		o = {$or: [ //多条件，数组
	        {name : {$regex : new RegExp(_name, 'i')}}
	    ]};
	};
	resumeModel.find(o, function(err, doc) {
		req.session.user = doc;
		return res.json(doc);
	})
})

/* Add resume */
router.post("/resume/add",function(req, res, next){
	var resumeModel = global.dbHandel.getModel('personResume');
	var o = {
		name:req.body.name,
		address:req.body.address,
		phone:req.body.phone,
		description:req.body.description,
		skill:req.body.skill,
		avatar:req.body.avatar
	};
	
	resumeModel.create(o, function(err, doc) {
		if (err) {
			res.send(500);
			console.log(err);
		} else {
			req.session.error = 'add work success！';
			res.send(200);
		}
	});
})

/* Get resume info */
router.post("/resume/info",function(req, res, next){
	var resumeModel = global.dbHandel.getModel('personResume');
	var o = {
		_id:req.body.id
	};
	resumeModel.findOne(o, function(err, doc) {
		if (err) {
			res.send(500);
		} else {
			return res.json(doc);
		}
	});
})



module.exports = router;
