var mysql = require('mysql')
var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123456',
    database:'websites',
})

//可以不这个 直接query
// connection.connect();

var sql = 'SELECT * FROM websites';

connection.query(sql,function(err,result,fields) {
    if(err){
        console.log('[SELECT ERROR] - ',err.message);
    return;
    }

    console.log('--------------------------SELECTs----------------------------');
    console.log(result);
    console.log('------------------------------------------------------------\n\n');  
})

connection.end();