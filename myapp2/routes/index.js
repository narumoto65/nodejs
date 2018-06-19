var express = require('express');
var router = express.Router();
var pg = require('pg');
//var pool = new pg.Pool();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mydataSchema = new Schema({
  'name':String,
  'mail':String,
  'memo': String
});

var MyData = mongoose.model('mydata',mydataSchema);
var db = mongoose.connect('mongodb://localhost/mydb');
/* GET home page. */
router.get('/', function(req, res, next) {
  MyData.find(function(err,docs){
    if(err){
      console.log(err);
    }
      res.render('index', { title: 'Summoners Lounge!',msg:'Welcome,Gamers!', datas:docs });
  })      
});

router.post('/', function(req, res, next) {
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
      res.redirect('/');
    })
});
/*
exports.test = function(req,res){
  MyData.find(function(err,docs){
    if(err){
      console.log(err);
    }
  });
};
*/
router.edit = function(req,res){
  var id = req.params.id;
  MyData.findOne({
    '_id' : id
  },function(err,doc){
    if(err){
      console.log(err);
    }
    res.render('edit',{title:'Express',msg:'データの更新',data:doc});
  });
};
router.update = function(req,res){
  var id = req.body.id;
  var name = req.body.name;
  var mail = req.body.mail;
  var memo = req.body.memo;
  MyData.findOne({
      '_id':id
  },function(err,doc){
    if(err){
      console.log(err);
    }
    doc.name = name;
    doc.mail = mail;
    doc.memo = memo;
    doc.save(function(err){
      if(err){
        console.log(err);
      }
      res.redirect('/');
    });
  });
 };

router.del = function(req,res){
  var id = req.params.id;
  MyData.findOne({
    '_id':id
  },function(err,doc){
    if(err){
      console.log(err);
    }
    res.render('delete',{title:'Express',msg:'データの削除',data:doc});
  });
};

router.remove = function(req,res){
  var id = req.body.id;
  MyData.findOne({
    '_id': id
  },function(err,doc){
    if(err){
      console.log(err);
    }
    doc.remove(function(err){
      if(err){
        console.log(err);
      }
      res.redirect('/');
    });
  });
};
router.kabutomushi = function(req, res){
    console.log('it works');
}
/*
module.exports = {
  kabutomushi: function(res,req){
    console.log('it works');
  },
  router
};
*/

module.exports = router;
//exports.router = router;
/*
module.exports = {
  router,
  edit: function(req,res){
  var id = req.params.id;
  MyData.findOne({
    '_id' : id
  },function(err,doc){
    if(err){
      console.log(err);
    }
    res.render('edit',{title:'Express',msg:'データの更新',data:doc});
  });
  },
  update: function(req,res){
    var id = req.body.id;
    var name = req.body.name;
    var mail = req.body.mail;
    var memo = req.body.memo;
    MyData.findOne({
      '_id':id
    },function(err,doc){
      if(err){
        console.log(err);
      }
      doc.name = name;
      doc.mail = mail;
      doc.memo = memo;
      doc.save(function(err){
        if(err){
          console.log(err);
        }
        res.redirect('/');
      });
    });
  }
};
*/
