var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var socket_io = require('socket.io');
var io = socket_io();

var routes = require('./routes/index');
var err_page = require('./routes/err_page');
var main = require('./routes/main');
var food = require('./routes/food');
var travelCookies = require('./routes/travelCookies');
var myCart = require('./routes/myCart');
var form = require('./routes/form');
var help = require('./routes/help')(io);
var admin = require('./routes/admin')(io);
var MTio = require('./routes/MTio')(io);
var pension = require('./routes/pension');
var bus = require('./routes/bus');
var community = require('./routes/community');
var login = require('./routes/login');
var order = require('./routes/order');
var myPage = require('./routes/myPage');

var app = express();
app.io = io;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'secret key',
    resave: false,
    saveUninitialized: true
}));

app.use('/', routes);
app.use('/main', main);
app.use('/food', food);
app.use('/form', form);
app.use('/myCart', myCart);
app.use('/travelCookies', travelCookies);
app.use('/help', help);
app.use('/admin12345abcde', admin);
app.use('/pension', pension);
app.use('/bus', bus);
app.use('/community', community);
app.use('/login', login);
app.use('/order', order);
app.use('/myPage', myPage);
app.use('/*', err_page);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
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
