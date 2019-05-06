var express = require('express');
var router = express.Router();
var store_controller = require('../controllers/storeController')
/* GET home page. */
router.get('/', store_controller.store);
module.exports = router;
