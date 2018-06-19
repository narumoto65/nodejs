var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mydataSchema = new Schema({
  'name':String,
  'mail':String,
  'memo': String
});

var MyData = mongoose.model('mydata',mydataSchema);
var db = mongoose.connect('mongodb://localhost/mydb');

/* GET users listing. */
router.get('/test', function(req, res, next) {
  //res.send('respond with a resource');
  /*if(req.session.login != true){
    msg = 'ログインしてください';
    res.render('index',{title:'title page',msg:msg});
  }else{
    */
  MyData.find(function(err,docs){
    if(err){
      console.log(err);
    }
    res.render('test',{title:'Data List',datas:docs});
  });
  //}
});
router.post('/test', function(req, res, next) {
    var name=req.body.name;
    var mail = req.body.mail;
    var memo = req.body.memo;
    var data = new MyData({
        'name':name,
        'mail':mail,
        'memo':memo
    })
    data.save(function(err){
      if(err){
        console.log(err);
      }
      //res.redirect('/');
    MyData.find(function(err,docs){
      if(err){
        console.log(err);
      }
      res.render('test',{title:'Data List',datas:docs});
        });
      })
});
module.exports = router;
