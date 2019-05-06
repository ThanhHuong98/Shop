var express = require('express');
var router = express.Router();
var home_controller = require('../controllers/homeController')
var user_controller = require('../controllers/userController')
var order_controller = require('../controllers/orderController')
var product_controller = require('../controllers/productController')
var store_controller = require('../controllers/storeController')
/* GET home page. */
router.get('/', home_controller.index);
router.get('/user',user_controller.user );
router.get('/order', order_controller.order );
router.get('/product',product_controller.product );
router.get('/store', store_controller.store);
module.exports = router;
