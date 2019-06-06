var Product = require('../models/order');
var Category = require('../models/category')
//add more model if need


exports.order_cart = function(req, res, next){
    //todo
    Category.allCategory(function (err, cb) {
        if (err) {
            return next(err);
        }
        res.render('pages/order/cart', { listCategory: cb })
    })
}

exports.order_checkout = function(req, res, next){
    Category.allCategory(function (err, cb) {
        if (err) {
            return next(err);
        }
        res.render('pages/order/checkout', { listCategory: cb })
    })
}

exports.order_trackOrder = function(req, res, next){
    var id = req.params.id;
    Category.allCategory(function (err, cb) {
        if (err) {
            return next(err);
        }
        res.render('pages/order/trackOrder', { listCategory: cb })
    })
}