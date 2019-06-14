var Category = require('../models/category')
//add more model if need


// Display list of all blogs
exports.blog_list = function(req, res, next){
    Category.allCategory(function (error, cb) {
        if (error) {
            return next(err);
        }
        res.render('pages/blog/blog', { listCategory: cb })
    })
}

// Display detail page for a specific blog.
exports.blog_detail = function(req, res, next){
    Category.allCategory(function (error, cb) {
        if (error) {
            return next(err);
        }
        res.render('pages/blog/blog-content', { listCategory: cb })
    })
}
