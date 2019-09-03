var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";
 
MongoClient.connect(url, 
  { 
    useNewUrlParser: true,
  }, 
  function(err, client) {
    if (err) throw err;
    console.log("数据库已创建!");
    var dbo = client.db('config')
    //集合操作
      // dbo.collections().then( res =>{
        // res[0].rename('list0',{},()=>{})
        // res[0].countDocuments({},{},(error,result)=>{
        //   console.log(result,'');
        // })
        // res[0].drop({},(error,result)=>{
        //   console.log(result,'');
        // })

      //   client.close();
      // })
      //创建集合
        // dbo.createCollection('configList',{},(err,res)=>{
        //   console.log(res,'create result')
        //   client.close();
        // })
      //往集合加文档
        // var obj = {
        //   "soft": "3",
        //   "description": "这只是一个响应 post 接口返回随机数据的例子",
        //   "method": "post",
        //   "url": "/upload",
        //   "mode": "{ data: { img: function({ _req, Mock }) { return _req.body.fileName + \"_\" + Mock.mock(\"@image\") }}}",
        // }
        // dbo.collection('configList').insertOne(obj,(err,res) => {
        //   if(err) throw err
        //   console.log('文档插入成功')
        //   client.close();
        // })
      //查找指定集合中的数据
        // dbo.collection('configList').find({}).toArray((err,result)=>{
        //   if(err) throw err
        //   console.log(result,'result ');
        //   client.close()
        // })
      //更新指定集合中的数据
        // dbo.collection('configList').updateOne({'mode':'ssssss'},{$set:{'soft':'4'}},(err,res)=>{
        //   if(err) throw err
        //   console.log(res.result.nModified,'条被修改 ');
        //   client.close()
        // })
      //排序指定集合中的数据
          // dbo.collection('configList').find().sort({'soft':1}).toArray((err,result)=>{
          //   if(err) throw err
          //   console.log(result,'result ');
          //   client.close()
          // })
      //排序指定集合中的数据
        dbo.collection('configList').find().limit(2).toArray((err,result)=>{
          if(err) throw err
          console.log(result,'result ');
          client.close()
        })
  }
);