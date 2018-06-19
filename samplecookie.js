var server = require('http').createServer();
server.on('request', doRequest);
server.listen(1234);
var fs = require('fs');
var ejs = require('ejs');
var url = require('url');
var cookie = require('cookie');
var index = fs.readFileSync('./index.ejs','utf8');
var style = fs.readFileSync('./style.css','utf8');

function doRequest(req,res){
    var path = url.parse(req.url);

    switch(path.pathname){
    case '/':
        var msg = 'クッキーはねえぜ'
        if(req.headers.cookie!=null){
            var ck = cookie.parse(req.headers.cookie);
            msg = 'クッキー:'+ck.lasturl+','+ck.lasttime;
        }
        var tmp = ejs.render(index,{title:"Index Page", msg:msg});
        res.setHeader('Content-Type', 'text/html');
        res.write(tmp);
        res.end();
        break;
    case '/style.css':
        res.setHeader('Content-Type', 'text/css');
        res.write(style);
        res.end();
        break;
    
    case '/favicon.ico':
        break;

    case '/time':
        var d = new Date().toDateString();
        var ck1 = cookie.serialize('lasttime',d, {maxAge:100});
        res.setHeader('Set-Cookie', ck1);
        res.setHeader('Content-Type','text/plain');
        res.write('SET Time-Cookie!');
        res.end();
        break;
    default:
        var ck1 = cookie.serialize('lasturl', path.pathname, {maxAge:100});
        res.setHeader('Set-Cookie', ck1);
        res.setHeader('Content-Type', 'text/plain');
        res.write('SET COOKIE');
        res.end();
        break;
    }
}
console.log('success!');