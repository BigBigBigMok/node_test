var express = require('express');
var router = express.Router();
 var URL = require('url');
//加载mysql模块
var mysql      = require('mysql');
//创建连接
var connection = mysql.createConnection({
host     : 'localhost',
user     : 'root',
password : 'G9a_875.iop',
database : 'node_test_2'
});
//执行创建连接 
connection.connect();
//SQL语句
var  sql = 'SELECT * FROM user';
var  addSql = 'INSERT INTO user(user_id,user_name,password) VALUES(?,?,?)';

router.get('/', function(req, res, next) {
    //解析请求参数
    var params = URL.parse(req.url, true).query;
      var addSqlParams = [params.user_id, params.user_name, params.password];
      
      //增
    connection.query(addSql,addSqlParams,function (err, result) {
        if(err){
         console.log('[INSERT ERROR] - ',err.message);
         return;
        }             
    });
    
    //查
    connection.query(sql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        console.log('---');
        
        //把搜索值输出
       res.send(result);
    });
});

module.exports = router;