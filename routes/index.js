var express = require('express');
var router = express.Router();

/* GET home page. */
//index page
router.get('/', function(req, res, next) {
  res.render('pages/index', { title: 'Shiba_inu' });
});

router.get('/about', function(req, res, next) {
    res.render('pages/about');
});

router.get('/contact',function(req, res, next){
  res.render('pages/contact')
})

router.get('/login',function(req, res, next){
  res.render('pages/login');
})

router.get('/register',function(req, res, next){
  res.render('pages/register')
})

router.get('/single',function(req, res, next){
  res.render('pages/single-product')
})
module.exports = router;