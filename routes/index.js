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

router.get('/cart',function(req, res, next){
  res.render('pages/cart')
})

router.get('/forget-password',function(req,res,next){
  res.render('pages/forget-password')
})

router.get('/love-product',function(req,res,next){
  res.render('pages/love-product')
})


router.get('/checkout',function(req,res,next){
  res.render('pages/checkout')
})

router.get('/trackorder',function(req,res,next){
  res.render('pages/trackOrder')
})

router.get('/list-product',function(req,res,next){
  res.render('pages/list-product')
})

router.get('/detail-a-product',function(req,res,next){
  res.render('pages/detail-a-product')
})

router.get('/blog',function(req,res,next){
  res.render('pages/blog')
})

router.get('/blog-content',function(req,res,next){
  res.render('pages/blog-content')
})

router.get('/edit',function(req,res,next){
  res.render('pages/profileEdit')
})
module.exports = router;