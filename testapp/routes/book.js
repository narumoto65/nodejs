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
  client2.post('statuses/update',
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
/* GET home page. */
/*outer.schedule = function(req, res, next) {
  res.render('schedule', { schedule: 'My Schedule Page!' });
};*/

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
  //var mailMessage;
  //var mailMessage = "";
  //var body = '';
  //var tmp = [];
  var phrase = "rps1801";
  var endphrase = "rps1816";
  client.connect();
  client.on("connect",function(){

      console.log('connected!');
      client.openMailbox("INBOX",function(error,info){
          if(error){
              console.log(error);
          }
          else{
          }
          client.listMessages(-10,function(err,messages){
              if(err){
                  console.log(err);
              }
              else{
                  //console.log(messages);
              }
                for(var i = 0; i< 10; i++){
                  if(messages[i].title == 'CNS Printer Status'){
                      client.createMessageStream(messages[i].UID).on('data',function(data){
                          //console.log(data);
                          body = conv.convert(data).toString();
                          if(body.indexOf(phrase) != -1){
                            //console.log(body);
                            tmp = body.split(phrase);
                            tmp = tmp[1].split(endphrase);
                            //console.log(tmp);
                          }
                          //mailMessage += body;
                      }) 
                  }
                }
                client.close();
                //console.log('done');
          })
            //client.close();
      })
  });
    //console.log(mailMessage);
    //parseMail(tmp);
    //res.render("mail",{title:"メールだよ",data2:mailMessage});
    res.render("mail",{title:"メールだよ",data2:parseMail(tmp)});
    //res.render("mail",{title:"メールだよ",data2:body});
    //res.render("mail",{title:"メールだよ",data2:body});
    //client.close();
}
  function parseMail(email){
    //console.log('hi');
    //console.log(email);
    //var convert = email;
    var emptyCount = 0;
    emailString = email + '';
    var printerData = emailString.split(' ');
    var result = [];
    var resultCount = 0;
    var p = 0;
    //console.log(printerData);
    for(var i = 0; i < printerData.length;i++){
      if(printerData[i]==''){
        printerData.splice(i,1);
        emptyCount++;
      }
    }
    for(var j = 0; j < printerData.length;j++){
      if(printerData[j]==''){
        printerData.splice(j,1);
      }
    }
    for(var k = 0; k < printerData.length;k++){
      if(printerData[k]==''){
        printerData.splice(k,1);
      }
    }
    for(var l = 1; l　<= printerData.length;l+=11){
      //for(var p = 0; p <= 15;p += 3){
      result[p] = printerData[l]+' ';
      p++;
      result[p] = printerData[l+1]+' ';
      p++;
      result[p] = printerData[l+2]+' ';
      p++;
      //resultCount+=3;
      /*
      console.log(printerData[l]);
      console.log(printerData[l+1]);
      console.log(printerData[l+2]);
      */
    }
    var resultString = '';
    var y = 1;
    for(var x = 0; x <= result.length; x++){
      if(x%3==0){
        resultString += '\n';
        resultString+= 'rps'+ y + ': ';
        y++;
      }
      //console.log(result[x]);
      resultString += result[x];
    }
    //console.log(result.length);
    //console.log(resultString);
    //console.log(printerData[132]);
    return resultString;
    
  }
router.plan = function(req,res){
  res.render('bookplan',{title:'読書予定'});
}

module.exports = router;
