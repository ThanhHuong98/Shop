var express = require('express');
var router = express.Router();
var product_controller = require('../controllers/productController')
/* GET home page. */
router.get('/', product_controller.product);
module.exports = router;
