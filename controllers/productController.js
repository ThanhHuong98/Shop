var Product = require('../models/product');
var Category = require('../models/category')
var async = require('async');


//add more model if need

//Display list of all products
exports.product_list = function(req, res, next){
    const id = req.params.id
    //
    Product.all(id, function(err,result){
        if (err){
            res.err(err);
        }else{
            res.render('pages/product/list-product', {list: result})
        }
    })
}
//Display list of all the favorite products
exports.product_favorite_list = function(req, res, next){
    //todo
     // Successful, so render
     res.render('pages/product/love-product')
}

// Display detail page for a specific product.
exports.product_detail = function(req, res, next){
    
    const id = req.query.id;
    
    console.log("ObjectID:");
    console.log(id);
    //  Product.findOne(id, function(err, result){
    //      if(err){
    //         res.err(err);
    //      }else{
    //         res.render('pages/product/detail-a-product', {singleProduct: result})
    //      }
    //  })
     async.parallel({
        singleProduct: function(callback){
            Product.findOne(id, callback);
        },
        listCategory: function(callback){
            Category.allCategory(callback);
        }
    
    },function(err, results) {
        if (err) { return next(err); }
        // if (results.list1 == null && results.list2 == null) { // No results.
        //     var err = new Error('Book not found');
        //     err.status = 404;
        //     return next(err);
        // }
        // Successful, so render.
        res.render('pages/product/detail-a-product', {singleProduct: results.singleProduct,listCategory: results.listCategory });
       // res.render('pages/home/index', {title: 'FloralShop',list1: results.list1, list2: results.list2, listCategory: results.listCategory});
    });


}
