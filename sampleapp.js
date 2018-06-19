var server = require('http').createServer();
server.on('request', doRequest);
server.listen(1234);
var fs = require('fs');
var ejs = require('ejs');
var url = require('url');

var index = fs.readFileSync('./index.ejs','utf8');
var style = fs.readFileSync('./style.css','utf8');

var datas = [
    {'name':'太郎','mail':'taro@yamada','tel':'090-9999-9999'},
    {'name':'花子','mail':'hanako@yamada','tel':'090-1919-4545'},
    {'name':'ichiro','mail':'ichiro@suzuki','tel':'090-0721-1919'}
];



function doRequest(req,res){
    var path = url.parse(req.url);

    switch(path.pathname){
    case '/':
        var tmp = ejs.render(index,{title:"Index Page", msg:"これはサンプルやで",datas:datas});
        res.setHeader('Content-Type', 'text/html');
        res.write(tmp);
        res.end();
        break;
    case '/style.css':
        res.setHeader('Content-Type', 'text/css');
        res.write(style);
        res.end();
        break;

    default:
        res.setHeader('Content-Type', 'text/plain');
        res.write('ERROR');
        res.end();
        break;
    }
}
console.log('success!');