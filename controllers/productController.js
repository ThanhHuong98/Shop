var Product = require('../models/product');
//add more model if need

//Display list of all products
exports.product_list = function(req, res, next){
    //todo
     // Successful, so render
    res.render('pages/list-product')
}

// Display detail page for a specific product.
exports.product_detail = function(req, res, next){
    //todo
     // Successful, so render
     res.render('pages/detail-a-product')
}

//Display list of all the favorite products
exports.product_favorite_list = function(req, res, next){
    //todo
     // Successful, so render
     res.render('pages/love-product')
}
