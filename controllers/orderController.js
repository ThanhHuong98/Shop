var Product = require('../models/product');
var Category = require('../models/category')
var Cart = require('../models/cart')
var Order = require('../models/order')
var Account = require('../models/account');
//add more model if need
exports.add = function (req, res, next) {
    var id = req.query.id;
    var quantity = req.query.quantity;
    var cart = new Cart(req.session.cart ? req.session.cart : {})

    Product.find(id, function (err, product) {
        if (err) {
            return res.send(err);
        }
        cart.add(product, product._id, quantity);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/cart');
    })
}
exports.increase = function (req, res, next) {
    var id = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.increase(id);
    req.session.cart = cart;
    res.redirect('/cart');
}
exports.reduce = function (req, res, next) {
    var id = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.reduce(id);
    req.session.cart = cart;
    res.redirect('/cart');
}
exports.remove = function (req, res, next) {
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.remove();
    req.session.cart = cart;
    
    res.redirect('/cart');
}

exports.order_cart = function (req, res, next) {
    Category.allCategory(function (err, cb) {
        if (err) {
            return next(err);
        }
        if (!req.session.cart) {
            res.render('pages/order/cart', { listCategory: cb, products: null })
        }
        else {
            var cart = new Cart(req.session.cart);
            res.render('pages/order/cart', { listCategory: cb, products: cart.generateArray(), totalPrice: cart.totalPrice })
        }
    })
}

exports.order_checkout = function (req, res, next) {
    Category.allCategory(function (err, cb) {
        if (err) {
            return next(err);
        }
        if (!req.session.cart) {
            return res.redirect('/cart');
        }
        var cart = new Cart(req.session.cart);
        res.render('pages/order/checkout', { listCategory: cb, totalPrice: cart.totalPrice })
    })
}

exports.order_trackOrder = function (req, res, next) {
    var userID = req.user._id;
    var id = req.params.id;
    Category.allCategory(function (error, cb) {
        if (error) {
            return next(err);
        }
        Account.findID(userID, function (err, rs) {
            Order.findOne(id, function (e, result) {
                res.render('pages/order/trackOrder', { listCategory: cb, account: rs, cart: result[0] })
            })
        })
    })
}
exports.place_order = function (req, res, next) {
    if (!req.session.cart) {
        return res.redirect('/cart');
    }
    var cart = new Cart(req.session.cart);
    var customerName = req.body.name;
    var phone = req.body.phone;
    var address = req.body.address;
    var note = req.body.note;
    Order.add(req.user._id, customerName, phone, address, note, cart, function (err, rs) {
        if (err) {
            res.err(err);
        } else {
            var arr = req.session.cart.items;
            Object.keys(arr).forEach(function(i){
                var id = arr[i].item._id;
                var oldQty = arr[i].item.quantity;
                var buyQty = arr[i].qty;
                var qty = parseInt(oldQty)-parseInt(buyQty);
                Product.updateQuantity(id,qty,function(errr,cb){
                    if(errr){
                        res.err(errr);
                    }else{
                        cart.remove();
                        req.session.cart = cart;
                        req.session.success = true;
                        res.redirect("/");
                    }
                })
            })
        }
    })
}

exports.manage = function (req, res, next) {
    var id = req.user._id;
    console.log(id);
    Category.allCategory(function (error, cb) {
        if (error) {
            return next(err);
        }
        Account.findID(id, function (err, rs) {
            Order.all(id, function (e, result) {
                if (!result) {
                    res.render('pages/order/orderManagement', { listCategory: cb, account: rs, list: null })
                } else {
                    console.log(result);
                    res.render('pages/order/orderManagement', { listCategory: cb, account: rs, list: result })
                }
            })
        })
    })
}