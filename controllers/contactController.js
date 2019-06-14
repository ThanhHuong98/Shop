
//add more model if need
var Category = require('../models/category')

// Display contact create form on GET.
exports.contact_create_get = function(req, res, next){
    Category.allCategory(function (error, cb) {
        if (error) {
            return next(err);
        }
        res.render('pages/contact/contact', { listCategory: cb })
    })
}
