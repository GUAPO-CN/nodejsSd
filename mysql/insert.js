var mysql = require('mysql')
var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123456',
    database:'websites',
})

connection.connect();

// var sql = 'INSERT INTO websites(Id,name,url,alexa,country) VALUES(0,?,?,?,?)';
// var sqlParmas =  ['菜鸟工具', 'https://c.runoob.com','23453', 'CN'];

// connection.query(sql,sqlParmas,function(err,result,fields) {
//     if(err){
//         console.log('[SELECT ERROR] - ',err.message);
//     return;
//     }

//     console.log('--------------------------INSERT----------------------------');
//     console.log('INSERT ID:',result);
//     console.log('------------------------------------------------------------\n\n');  
// })


// var sql = 'UPDATE websites SET name=?,url=?,country=? WHERE Id=?';
// var sqlParmas =  ['xxAB', 'https://c.oneav.com','JP',6];

// connection.query(sql,sqlParmas,function(err,result,fields) {
//     if(err){
//         console.log('[SELECT ERROR] - ',err.message);
//     return;
//     }

//     console.log('--------------------------UPDATE----------------------------');
//     console.log('UPDATE ID:',result);
//     console.log('------------------------------------------------------------\n\n');  
// })


var delsql = 'DELETE FROM websites WHERE Id=6';

connection.query(delsql,function(err,result,fields) {
    if(err){
        console.log('[SELECT ERROR] - ',err.message);
    return;
    }

    console.log('--------------------------DELETE----------------------------');
    console.log('DELETE ID:',result);
    console.log('------------------------------------------------------------\n\n');  
})

connection.end();