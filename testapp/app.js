var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bookRouter = require('./routes/book');
var schRouter = require('./routes/schedule');
//var bookRouter2 = require('./routes/book2');

var app = express();
var io = require('socket.io')(http);
var http=require('http').Server(app);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.get('/book',bookRouter);
app.post('/book', bookRouter);
app.get('/book/delete/:id',bookRouter.del);
app.post('/book/remove',bookRouter.remove);
app.get('/bookplan',bookRouter.plan);
app.get('/book/edit/:id',bookRouter.edit);
app.post('/update',bookRouter.update);
app.get('/anime',bookRouter.tweet);
app.get('/mail',bookRouter.mail);
//app.get('schedule',bookRouter.schedule);
app.get('/schedule',schRouter.schedule);
//app.post('/bookplan',bookRouter.planadd);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

app.listen(1234);
console.log('server is up');
