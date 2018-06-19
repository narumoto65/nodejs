var express = require('express');
var router = express.Router();
var session = require('express-session');

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.login != true){
    msg = 'ログインしてください';
    res.render('index', { title: 'Login',msg:msg});
    console.log('1');
  }else{
    msg = 'ID:' + req.session.name + 'でログインしています。';
    res.render('index', { title: 'Login done',msg:msg});
    //res.redirect('/test')
    console.log('2');
  }
  
});

router.post('/', function(req, res, next) {
  var members = {
    taro:'yamada',
    hanako:'flower'
  }

  var name = req.body.name;
  var pass = req.body.pass;
  var member_pass= members[name];
  if(member_pass=pass){
    req.session.login = true;
    req.session.name = name;
    msg = '"'+ name + '"でログインしました';
    res.render('index', { title: 'Login done'});
    console.log('3');
  }else{
    req.session.login = false;
    msg = 'ログインに失敗しました';
    console.log('4');
    res.render('index', { title: 'Login',msg:msg});
  }
  //res.render('index', { title: 'Login Session!',msg:msg });
});

exports.edit = function(res,req){
  console.log('hi');
};

module.exports = router;


