// set up ======================================================================

var express = require('express');
var app = express();

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
var createError = require('http-errors');
const flash = require('connect-flash');

const Account = require('./models/account');

// router files ===============================================================
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// configuration ===============================================================

var db = require('./db')

db.connect('mongodb://admin:1234@floralcluster-shard-00-00-g48mu.mongodb.net:27017,floralcluster-shard-00-01-g48mu.mongodb.net:27017,floralcluster-shard-00-02-g48mu.mongodb.net:27017/test?ssl=true&replicaSet=FloralCluster-shard-0&authSource=admin&retryWrites=true', function (err, db) {
  if (err) {
    console.log('Unable to connect to Mongo.')
    process.exit(1)
  } else {
    console.log('Connect Mongodb Successfully...')
  }
})

// Passport Config
require('./config/passport')(passport);

// set up our express application
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


// required for passport
app.use(session({
  secret: 'eminem', // session secret
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({ url: 'mongodb://admin:1234@floralcluster-shard-00-00-g48mu.mongodb.net:27017,floralcluster-shard-00-01-g48mu.mongodb.net:27017,floralcluster-shard-00-02-g48mu.mongodb.net:27017/test?ssl=true&replicaSet=FloralCluster-shard-0&authSource=admin&retryWrites=true' }),
  cookie: {
    maxAge: 180 * 60 * 1000
  }
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

//Connect flash
app.use(flash());

//Global vars
app.use(function (req, res, next) {
  res.locals.error = req.flash('error');
  res.locals.msg = req.flash('msg');
  //res.locals.session = req.session;
  next();
})

// routes ======================================================================
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  if (err.status != 500) {
    res.status(err.status).render('pages/home/error');
  } else {
    res.status(500).render('pages/home/error1');
  }
});
module.exports = app;
