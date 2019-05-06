var express = require('express');
var router = express.Router();
var user_controller = require('../controllers/userController')
/* GET home page. */
router.get('/', user_controller.user);
module.exports = router;
