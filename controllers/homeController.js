
//add more model if need
var Category = require('../models/category');
var Product = require('../models/product');
var type = 1;


exports.index = function(req, res, next){ 

    Product.randomProduct(function(err, result){
        console.log("test");
        if(err){
            console.log(err);
            res.err(err);
        
        } else{
            console.log("11111111")
            let arr1 =  result.slice(0,5)
            let arr2 = result.slice(6,11)
            let result1 = {list1: arr1, list2: arr2}
            res.render('pages/home/index', {title: 'FloralShop',list: result1});
            console.log("All products random: ");
           console.log(result1);
        }
    })   
}