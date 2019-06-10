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
    },function(err, result){
        if (err){
            res.error(err);
        }else{
            res.render('pages/product/list-product', {list: result.list , listCategory:result.listCategory})
        }
    })
}
exports.pagination = function(req, res, next){
    const id = req.params.id;
    const page = req.params.page;
    async.parallel({        
        listCategory: function(callback){
            Category.allCategory(callback);
        },
        list: function (callBack) {
            Product.paginate(id, page, callBack);
        },
    },function(err,result){
        if (err){
            res.send(err);
        }else{
            res.render('pages/product/list-product', {list: result.list.products, listCategory:result.listCategory, id: id, current: page, pages: result.list.pages, title : result.list.title, count: result.list.count})
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
    const code = req.query.code;

     async.parallel({
        singleProduct: function(callback){
            Product.findOne(id, callback);
        },
        listCategory: function(callback){
            Category.allCategory(callback);
        },  

        relatedProducts: function(callback){
            Product.findRelatedProducts(code, callback);
        },
        listComment: function(callBack){
          Product.allComment(id, callBack);
         }

    },function(err, results) {
        if (err) { return next(err); }
        res.render('pages/product/detail-a-product', {singleProduct: results.singleProduct,listCategory: results.listCategory, 
                                                      relatedProducts: results.relatedProducts, listComment:results.listComment});
    });
}

exports.post_comment_product = function(req, res, next){
    
    const id = req.query.id;

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

exports.search_product = function(req, res, next){

    var param = req.query.name;
    if(param != undefined){
        var str = param.toLowerCase();
    const name = str.charAt(0).toUpperCase() + str.slice(1);
    console.log("nameSearch: ", str +" " + name);

    Product.search(name, function(err, product){
        if(err) {res.err(err);}
        else{
            if(product!=null){
                console.log("Ket qua search");
                console.log(product);
                const id = product._id;
                const code = product.category;

                async.parallel({
                    listCategory: function(callback){
                        Category.allCategory(callback);
                    },  
                    relatedProducts: function(callback){
                        Product.findRelatedProducts(code, callback);
                    },
                    listComment: function(callBack){
                    Product.allComment(id, callBack);
                    }
            
                },function(err, results) {
                    if (err) { return next(err); }
                    res.render('pages/product/detail-a-product', {singleProduct:product,listCategory: results.listCategory, 
                                                                relatedProducts: results.relatedProducts, listComment:results.listComment});
                });
            }else{
                res.status(401).json({error: 'Sản phẩm này đã hết hàng hoặc shop chưa cung cấp!'});
            }
        }
    })
    }else
        res.status(401).json({error: 'Tên sản phẩm cần tìm không được để trống, vui lòng nhập lại!'});
}
