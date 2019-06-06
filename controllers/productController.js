var Product = require('../models/product');
var Category = require('../models/category')
var async = require('async');


//add more model if need

//Display list of all products
exports.product_list = function(req, res, next){
    const id = req.params.id
    //
    async.parallel({        
        listCategory: function(callback){
            Category.allCategory(callback);
        },
        list: function (callBack) {
            Product.all(id, callBack);
        }
    },function(err,result){
        if (err){
            res.err(err);
        }else{
            res.render('pages/product/list-product', {list: result.list,listCategory:result.listCategory})
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
    
    //const id = req.query.id;
    const code = req.query.code;
    const id = "5cd81e2ee7b5fd028a1eb697";

     async.parallel({
        singleProduct: function(callback){
            Product.findOne(id, callback);
        },
        listCategory: function(callback){
            Category.allCategory(callback);
        },  

        relatedProducts: function(callback){
            Product.findRelatedProducts(code, callback);
        }
        
        // listComment: function(callBack){
        //    // Product.allComment(id, callBack);
        // }

    },function(err, results) {
        if (err) { return next(err); }
        res.render('pages/product/detail-a-product', {singleProduct: results.singleProduct,listCategory: results.listCategory, relatedProducts: results.relatedProducts});
    });
}

exports.post_comment_product = function(req, res, next){
    
    //const id = req.body.id;
    const id = "5cd81e2ee7b5fd028a1eb697";

    const name_user = req.body.name;
    const title = req.body.title;
    const content = req.body.comment;

    console.log("ObjectID comment:");
    console.log(id);
    console.log("from nhan xet", name_user +" " + title +" " + content)
    
    Product.saveComment(id, name_user, title, content, function(err, result){
        if(err) {res.err(err);}
        res.redirect('/');
        })

}
