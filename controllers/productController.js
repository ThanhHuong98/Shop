var Product = require('../models/product');
//add more model if need

//Display list of all products

exports.product_list = function(req, res, next){
    //todo
     // Successful, so render
    res.render('pages/list-product')
}
