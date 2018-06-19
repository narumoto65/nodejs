var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testRouter = require('./routes/test')
//var routes = require('./routes/index.js');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(cookieParser('secret','mycom_sercred_key'));　//second argument generates the secret key
//app.use(session({key:'session_id'}));

app.get('/', indexRouter);
app.post('/',indexRouter);
//app.post('/',indexPost);
app.use('/users', usersRouter);

app.get('/edit/:id', indexRouter.edit);
app.post('/update', indexRouter.update);
app.get('/delete/:id', indexRouter.del);
app.post('/remove', indexRouter.remove);


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
app.listen(1234);
console.log('server is running dude!');
module.exports = app;
