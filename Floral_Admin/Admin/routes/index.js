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
module.exports = router;
