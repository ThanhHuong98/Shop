var db = require('../db');
var ObjectId = require('mongodb').ObjectID;

exports.find = function (id, cb) {
    var collection = db.get().collection('Product');

    collection.findOne({ category: "MX" }, (err, result) => {
        //console.log(result)
        cb(err, result)
    });
}


exports.all = function (id, cb) {
    var collection = db.get().collection('Product')
    // var category = db.get().collection('Category')
    var categoryId = ""
    switch (id) {
        case "1": categoryId = "MX"; break;
        case "2": categoryId = "MH"; break;
        case "3": categoryId = "MT"; break;
        case "4": categoryId = "MĐ"; break;
    }
    if (id != "0") {
        collection.aggregate([
            {
                $match: {
                    category: categoryId
                }
            },
            {
                $lookup:
                {
                    from: "Category",
                    localField: "category",
                    foreignField: "code",
                    as: "category_detail"
                }
            }
        ]).toArray((err, result) => {
            console.log(result)
            cb(err, result)
        })
    } else {
        collection.aggregate([
            {
                $lookup:
                {
                    from: "Category",
                    localField: "category",
                    foreignField: "code",
                    as: "category_detail"
                }
            }
        ]).toArray((err, result) => {
            cb(err, result)
        })
    }
}

//read all products
exports.allProduct = function(cb) {
    var collection = db.get().collection('Product');
    collection.find().toArray(function(err, result){
        cb(err, result)
    })
}
//Read radom 5 products in listProduct
exports.randomProduct = function(cb){
    var collection = db.get().collection('Product');

    collection.aggregate([{$sample: {size : 20}}
    ]).toArray(function(err, result){
        cb(err, result)
    })

    // collection.find({}).toArray(function(err, result){
    //         cb(err, result)
    //     })
}

exports.findOne = function(id, cb) {
    var collection = db.get().collection('Product');

    collection.find({_id: ObjectId(id) }).toArray(function(err, result){
        cb(err, result)
        console.log("Single - Product");
        console.log(result);
    })
}

exports.findRelatedProducts = function(code, cb){

    var collection = db.get().collection('Product');

    collection.find({category: code}).toArray(function(err, result){
        cb(err, result)
        console.log("Related-Products");
        console.log(result);
    })
}