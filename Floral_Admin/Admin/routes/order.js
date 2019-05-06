var express = require('express');
var router = express.Router();
var order_controller = require('../controllers/orderController')
/* GET home page. */
router.get('/', order_controller.order);
module.exports = router;
