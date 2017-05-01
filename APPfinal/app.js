var express = require('express');
var noteapp = express();
var rest_api = require('./routes/rest_api');
var bodyParser = require('body-parser');

noteapp.use(bodyParser.json()); //for parsing noteapplication/json
//noteapp.use(/^((?!.*abc).*)/,express.static(__dirname+'/'));
noteapp.use('/',express.static(__dirname+'/'));
noteapp.use('/memory', express.static(__dirname + '/'));
noteapp.use('/date', express.static(__dirname + '/'));
noteapp.use('/note', express.static(__dirname + '/'));

noteapp.all('/api/add',function(req,res,next){
	console.log('Add API is called...');
	api = new rest_api();
	result = api.write(req);
  if (result) {
    res.json({success: true})
  }
});

noteapp.all('/api/list', function(req,res,next){
  console.log('List API is called...');
  api = new rest_api();
  api.list(req, res);
});

noteapp.all('/api/rem',function(req,res,next){
	console.log('Rem API is called...');
	api = new rest_api();
	api.rem(req, res);
});

/*
noteapp.listen(3000, function(){
	console.log('Example noteapp listening on port 3000!');
});
*/

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');


// view engine setup
noteapp.set('views', path.join(__dirname, 'views'));
noteapp.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//noteapp.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
noteapp.use(logger('dev'));
noteapp.use(bodyParser.json());
noteapp.use(bodyParser.urlencoded({ extended: false }));
noteapp.use(cookieParser());
noteapp.use(express.static(path.join(__dirname, 'public')));

noteapp.use('/', index);
noteapp.use('/users', users);

// catch 404 and forward to error handler
noteapp.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
noteapp.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.noteapp.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const {app, BrowserWindow} = require('electron')
const ipath = require('path')
const url = require('url')

let win

function createWindow(){
  win = new BrowserWindow({width: 800, height: 600})

  win.loadURL(url.format({
    pathname: 'localhost:3000',
    protocol: 'http:',
    slashes: true
  }))

  win.webContents.openDevTools()

  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin'){
    app.quit()
  }
})

module.exports = app;
