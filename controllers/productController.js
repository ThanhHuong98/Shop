var Product = require('../models/product');
var Category = require('../models/category')
var async = require('async');

exports.pagination = function (req, res, next) {
    const id = req.params.id;
    const page = req.params.page;
    async.parallel({
        listCategory: function (callback) {
            Category.allCategory(callback);
        },
        list: function (callBack) {
            Product.paginate(id, page, callBack);
        },
    }, function (err, result) {
        res.status(200).render('pages/product/list-product', { list: result.list.products, listCategory: result.listCategory, id: id, current: page, pages: result.list.pages, title: result.list.title, count: result.list.count })
    })

}

// Display detail page for a specific product.
exports.product_detail = function (req, res, next) {

    const id = req.query.id;
    const code = req.query.code;

    var nameUser = "";

    async.parallel({
        singleProduct: function (callback) {
            Product.findOne(id, callback);
        },
        listCategory: function (callback) {
            Category.allCategory(callback);
        },
        relatedProducts: function (callback) {
            Product.findRelatedProducts(code, callback);
        },
        listComment: function (callBack) {
            Product.allComment(id, callBack);
        }
    }, function (err, results) {
        if (results.singleProduct === null) { return res.status(404).send(err); }
        res.status(200).render('pages/product/detail-a-product', {
            singleProduct: results.singleProduct, listCategory: results.listCategory,
            relatedProducts: results.relatedProducts, listComment: results.listComment, nameUser: nameUser
        });
    });
}

exports.post_comment_product = function (req, res, next) {

    const id = req.body.id;
    const code = req.body.code;
    var name_user = req.body.name;
    const title = req.body.title;
    const content = req.body.comment;

    var date = new Date();
    date.setHours(0, 0, 0, 0);
    const update = date.getTime();
    //console.log(req.user);
    const userLogin = req.user;

    Product.saveComment(id, name_user, title, content, update, function (err, result) {
        res.status(200).redirect('/detail-a-product?id=' + id + "&&code=" + code);
    })
}

exports.search_product = function (req, res, next) {

    var param = req.body.param;

    if (param != "") {
        var str = param.toLowerCase();
        const name = str.charAt(0).toUpperCase() + str.slice(1);
        Product.searchSmart(name, function (err, result) {
            //res.redirect('/');
            Category.allCategory(function (err1, category) {
                var title = "Kết quả cho \"" + param + "\"";
                res.status(200).render('pages/product/search', { list: result, listCategory: category, title: title, count: result.length })
            })

        })
    } else {
        Category.allCategory(function (error, rs) {
            var title = "Không tìm thấy!";
            var list = [];
            res.status(204).render('pages/product/search', { list: list, listCategory: rs, title: title, count: 0 })
        })
    }
}



