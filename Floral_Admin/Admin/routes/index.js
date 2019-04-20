var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/index', { title: 'Express' });
});
router.get('/user', function(req, res, next) {
  res.render('pages/user');
});
router.get('/order', function(req, res, next) {
  res.render('pages/order');
});
router.get('/product', function(req, res, next) {
  res.render('pages/product');
});
router.get('/store', function(req, res, next) {
  res.render('pages/store');
});
module.exports = router;
