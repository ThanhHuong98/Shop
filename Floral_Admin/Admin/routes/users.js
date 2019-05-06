var express = require('express');
var router = express.Router();
var home_controller = require('../controllers/homeController')
/* GET users listing. */
router.get('/', home_controller.users);

module.exports = router;
