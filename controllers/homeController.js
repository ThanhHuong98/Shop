
//add more model if need
var Category = require('../models/category');
var Product = require('../models/product');
var async = require('async');


exports.index = function(req, res, next){ 
    async.parallel({
        listNewProduct: function(callback){
            //Product.getNewProduct(0, callback);
            Product.randomProduct(callback)
        },
        listPopularProduct: function(callback){
           // Product.getPopularProduct(callback);
           Product.randomProduct(callback)
        },

        listCategory: function(callback){
            Category.allCategory(callback);
        }

    },function(err, results) {
        if (err) { return next(err); }
        var temp = req.session.success;
        req.session.success = false;
        res.render('pages/home/index', {title: 'FloralShop',listNewProduct: results.listNewProduct, listPopularProduct: results.listPopularProduct, listCategory: results.listCategory,success: temp});
    });
}

exports.paginationNew = function(req, res, next){
    const page = req.params.page;
    console.log('PAGE', page);
    Product.getNewProduct(page,function(err, results){
        if(err) {res.err(err);}
        res.json(results);
    })
}