var express = require('express');
var app = express();
var rest_api = require('./routes/rest_api');
var bodyParser = require('body-parser');

app.use(bodyParser.json()); //for parsing noteapplication/json
//noteapp.use(/^((?!.*abc).*)/,express.static(__dirname+'/'));
app.use('/',express.static(__dirname+'/'));
app.use('/memory', express.static(__dirname + '/'));
app.use('/date', express.static(__dirname + '/'));
app.use('/note', express.static(__dirname + '/'));

app.all('/api/add',function(req,res,next){
	console.log('Add API is called...');
	api = new rest_api();
	result = api.write(req);
  if (result) {
    res.json({success: true})
  }
});

app.all('/api/list', function(req,res,next){
  console.log('List API is called...');
  api = new rest_api();
  api.list(req, res);
});

app.all('/api/rem',function(req,res,next){ 
  console.log('Rem API is called...'); 
  api = new rest_api(); 
  api.rem(req, res); 
}); 

/*
app.listen(3000, function(){
  console.log('Example app listening on port 3000!');
});
*/
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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