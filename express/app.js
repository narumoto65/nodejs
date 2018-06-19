var express = require('express');
var jade = require('jade');

var app = express();

app.get('/',function(req,res){
    res.render('index.jade');
});

app.listen(1234);
console.log('server running');