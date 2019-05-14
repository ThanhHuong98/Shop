var Product = require('../models/product');

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
    //todo
     // Successful, so render
     //const id = req.params.id;
    //  const id = "5cd81bace7b5fd028a1eb63f";
    //  console.log("ObjectID: ");
    //  console.log(id);

    //  async.parallel({
    //         singleProduct: function(callback){
    //             Product.findOne(id,callback)
    //     },
    // },function(err, result) {
    //     if (err) { return next(err); }
    //     // if (results.list1 == null && results.list2 == null) { // No results.
    //     //     var err = new Error('Book not found');
    //     //     err.status = 404;
    //     //     return next(err);
    //     // }
    //     // Successful, so render.
    //     console.log("Single - Product");
    //     console.log(result.singleProduct);
    //     res.render('pages/product/detail-a-product', {singleProduct: result.singleProduct})
    // });
    //const id = "5cd81bace7b5fd028a1eb63f";

    const id = req.params.id;
    
    console.log("ObjectID:");
    console.log(id);

     Product.findOne(id, function(err, result){
         if(err){
            res.err(err);
         }else{
            res.render('pages/product/detail-a-product', {singleProduct: result})
         }
     })

}