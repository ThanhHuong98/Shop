
//add more model if need
var Category = require("../models/category");

exports.index = function(req, res, next){
    //todo
    Category.all(function(err, docs){
        res.render('pages/home/index', { title: 'FloralShop' });
        console.log(docs);
    })
    
};
