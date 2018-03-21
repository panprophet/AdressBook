var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');

var routes = require('./routes/index');
var users = require('./routes/users');
var Countries = require('./routes/Countries');
var Cities = require('./routes/Cities');
var Contacts = require('./routes/Contacts');
var Agencies = require('./routes/Agencies');
var CountriesCities = require('./routes/CountriesCities');
var Upload = require('./routes/Upload');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
//app.use('/', index);
app.use('/users', users);
app.use('/Countries', Countries);
app.use('/Cities', Cities);
app.use('/Contacts', Contacts);
app.use('/Agencies', Agencies);
app.use('/CountriesCities', CountriesCities);
app.use('/Upload', Upload);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
            res.render('error', {
            message: err.message,
            error: err
            });
    });
}
 
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
});

module.exports = app;
