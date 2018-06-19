var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mydataSchema = new Schema({
  'title':String,
  'author':String,
  'summary':String,
  'review': String
});
var mail;

var twitter = require('twitter');

var client = new twitter({
    consumer_key:'FYuosFAgJL0ZHsiW4XyS5npMb',
    consumer_secret:'NIahHAJrJcZemUgSrQDa3lmXdXaFAKD15AZuoRKzGnIPFrLUP9',
    access_token_key:'943209892067794944-rgJQUSaoXWrFx8FhdNRFgbheGEybXal',
    access_token_secret:'sdgLHHlerl3FwuKoHTOLyMflA3Ho46YsooWvKuh1IW6Ln'
});

var inbox = require("inbox");
const server ="imap.sfc.keio.ac.jp";
const user = "t16642sn";
const password = "Himawari12";
var iconv = require('iconv');
var conv = new iconv.Iconv("ISO-2022-JP","UTF-8");

var client = inbox.createConnection(false,server,{
    secureConnection: true,
    auth:{
        user:user,
        pass:password
    }
});

var MyData = mongoose.model('bookdb2',mydataSchema);
var db = mongoose.connect('mongodb://localhost/bookdb2');
/* GET home page. */
router.get('/book', function(req, res, next) {
  MyData.find(function(err,docs){
    if(err){
      console.log(err);
    }
    /*
    for(var i =0;i<docs.length;i++){
      if(docs[i].summary == ''){
        docs[i].summary ="<a href='/book'>概要記入</a>"
        console.log(docs[i]);
      }
    }
    */
      //console.log(docs.length);
      res.render('book', { title: '読書リスト', datas:docs });
  })      
});

router.post('/book',function(req,res){
    var title =req.body.title;
    var author = req.body.author;
    var  summary = req.body.summary;
    var review = req.body.review;
    var data = new MyData({
        'title':title,
        'author':author,
        'summary':summary,
        'review':review
    })
    data.save(function(err){
      if(err){
        console.log(err);
      }
      res.redirect('/book');
    })
});

router.tweet = function(req,res){
  var time = new Date();
  var hour = time.getHours();
  var minute = time.getMinutes();
  var second = time.getSeconds();
  client.post('statuses/update',
    {status:'二郎食べたい@ ' + hour + '時'+ minute +'分'+second+'秒'},
    function(error, tweet,response){
        if(!error){
            console.log(tweet);
        }
        if(error){
            console.log(error);
        }
    });
      res.redirect('/book');
  };

router.del = function(req,res){
  var id = req.params.id;
  MyData.findOne({
    '_id':id
  },function(err,doc){
    if(err){
      console.log(err);
    }
    res.render('delete',{title:'Are you sure you want to delete this book?',data:doc});
  });
};

router.remove = function(req,res){
  var id = req.body.id;
  MyData.findOne({
    '_id':id
  },function(err,doc){
    if(err){
      console.log(err);
    }
    doc.remove(function(err){
      if(err){
        console.log(err);
      }
    res.redirect('/book');
    });
  });
};

router.edit= function(req,res){
  var id = req.params.id;
  MyData.findOne({
    "_id":id
  },function(err,doc){
    if(err){
      console.log(err);
    }
    console.log(doc);
    res.render('edit',{title:'edit page',data:doc})
  });
};

router.update = function(req,res){
  var id = req.body.id;
  var title = req.body.title;
　var summary = req.body.summary;
  var review = req.body.review;
  var author = req.body.author;
  MyData.findOne({
    '_id':id
  },function(err,doc){
    if(err){
      console.log(err);
    }
    console.log(doc);
    doc.title = title;
    doc.author = author;
    doc.summary = summary;
    doc.review = review;
    doc.save(function(err){
      if(err){
        console.log(err);
      }
    res.redirect('/book');
    });
  });
};
router.mail = function(req,res){
    client.connect();
    client.on("connect",function(){
    console.log('connected!');
    client.openMailbox("INBOX",function(error,info){
        if(error){
            console.log(error);
        }
        else{
            //console.log(info);
        }
        client.listMessages(-50,function(err,messages){
            if(err){
                console.log(err);
            }
            else{
                //console.log(messages);
            }
            messages.forEach(function(message){
                //const uid = message.UID;
                //console.log(uid);
                //console.log(message.title);
                if(message.title == 'CNS Printer Status'){
                    client.createMessageStream(message.UID).on('data',function(data){
                        var body = conv.convert(data).toString();
                        //console.log(body);
                        mail += body;
                        console.log(mail);
                    })
                }
            })
            //console.log(mail);
            client.close();
        })
    })
    });
  res.render('mail',{title:'メール表示',data2:mail});
};
router.plan = function(req,res){
  res.render('bookplan',{title:'読書予定'});
}

module.exports = router;
