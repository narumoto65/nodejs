var express = require('express');
var router = express.Router();
var pg = require('pg');
var pool = pg.Pool();

/* GET home page. */
router.get('/', function(req, res, next) {
  var conf = "tcp://postgres:Ninjapanda65@localhost:5432/sera_db";
  pool.connect(conf,function(err,client,done){
    if(err){
      console.log(err);
    }else{
      client.query("SELECT * from mydata", function(err,result){
          res.render('index',{
            title:'Express',
            msg:'mydataの一覧リスト',
            datas:result.rows
          });
      });
    }
  });
});
  /*var id = req.query.id;
  var name = req.query.name;
  var msg = 'こんにちは';
  */
  /*
  if(id != undefined){
    msg += 'ID=' + id + '番';
  }
  if(name != undefined){
    msg += name + 'さん';
  }
  //res.render('index', { title: 'Express', msg:msg });
  var cookie = req.cookies;
  if(cookie != undefined){
    msg += '(saved:' + cookie.msg + ')';
  }
  if(req.session.login != true){
    msg = 'ログインしてください'
  }else{
    msg = 'ID:' + req.session.name + 'でログインしています';
  }

  res.render('index',{
    title:'Express',
    msg:msg
  })
});
*/
module.exports = router;
