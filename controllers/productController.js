var Product = require('../models/product');
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

// Display detail page for a specific product.
exports.product_detail = function(req, res, next){
    //todo
     // Successful, so render
     const id = req.params.id;
     
     Product.findOne(id, function(err, result){
         if(err){
            res.err(err);
         }else{
            res.render('pages/product/detail-a-product', {singleProduct: result})
         }
     })
}

//Display list of all the favorite products
exports.product_favorite_list = function(req, res, next){
    //todo
     // Successful, so render
     res.render('pages/product/love-product')
}
