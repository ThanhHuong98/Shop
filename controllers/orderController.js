var Product = require('../models/order');
//add more model if need


exports.order_cart = function(req, res, next){
    //todo
     // Successful, so render
     res.render('pages/cart')
}

exports.order_checkout = function(req, res, next){
    //todo
     // Successful, so render
     res.render('pages/checkout')
}

exports.order_trackOrder = function(req, res, next){
    //todo
     // Successful, so render
     res.render('pages/trackOrder')
}