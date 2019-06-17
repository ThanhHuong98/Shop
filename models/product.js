var db = require('../db');
var ObjectId = require('mongodb').ObjectID;
const QUANTITY = 10;

exports.updateType = function () {
    var collection = db.get().collection('Product')
    collection.find({ price: { $exists: true } }).forEach(function (obj) {
        obj.price = parseInt(obj.price);
        collection.save(obj);
    });
}
exports.find = function (id, cb) {
    var collection = db.get().collection('Product');

    collection.findOne({ _id: ObjectId(id) }, (err, result) => {
        cb(err, result)
    });
}


exports.all = function (id, cb) {
    var collection = db.get().collection('Product')
    if (id != "0") {
        db.get().collection('Category').findOne({ _id: ObjectId(id) }, function (err, result) {
            var categoryId = result.code
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
            ]).toArray((error, result) => {
                cb(error, result)
            })
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
        ]).toArray((error, result) => {
            cb(error, result)
        })
    }
}

//read all products
exports.allProduct = function (cb) {
    var collection = db.get().collection('Product');
    collection.find().toArray(function (err, result) {
        cb(err, result)
    })
}
//Read radom 5 products in listProduct
exports.randomProduct = function (cb) {
    var collection = db.get().collection('Product');

    collection.aggregate([{ $sample: { size: QUANTITY } }
    ]).toArray(function (err, result) {
        cb(err, result)
    })

    // collection.find({}).toArray(function(err, result){
    //         cb(err, result)
    //     })
}
exports.getNewProduct = function(page, cb){
    page = parseInt(page, 10);
    
    if(page == undefined) page = 0;
    var collection = db.get().collection('Product');
    var listNew=[];
    collection.find({}).limit(QUANTITY).toArray(function(err, result){
        if(page == 0){
            for(var i=0; i < result.length/2; i++){
                listNew.push(result[i]);
            }
            cb(err, listNew);
        }else{
            for(var i = 5; i < result.length; i++){
                listNew.push(result[i]);
            }
            cb(err, listNew);
        }
    })
}

exports.getPopularProduct=function(cb){
    var collection = db.get().collection('Product');

    collection.find({}).limit(QUANTITY).toArray(function(err, result){
        cb(err, result);
    })
}

exports.findOne = function (id, cb) {
    var collection = db.get().collection('Product');

    collection.findOne({ _id: ObjectId(id) }, function (err, result) {
        cb(err, result)
    })
}

exports.allComment = function (id, cb) {
    var collection = db.get().collection('Product');
    collection.findOne({ _id: ObjectId(id) }, function (err, result) {
        var listComment = result.comment;
        if (listComment == undefined) {
            listComment = [];
        }
        cb(err, listComment)
        console.log("list-comment");
        console.log(listComment);
    })
}

exports.findRelatedProducts = function (code, cb) {

    var collection = db.get().collection('Product');
    collection.find({ category: code }).limit(6).toArray(function (err, result) {
        cb(err, result)
    })
}

exports.saveComment = function (id, name_user, title, content, update,cb) {
    var collection = db.get().collection('Product');
    collection.updateOne({ _id: ObjectId(id) }, {
        $push: {
            comment: {
                name_user,
                title,
                content,
                update
            }
        }
    }, function (err, result) {
        cb(err, result);
    });
}

exports.search = function (name, cb) {

    var collection = db.get().collection('Product');
    collection.findOne({ name: name }
        , function (err, result) {
            cb(err, result);
        })
}

exports.paginate = function (id, page, cb) {
    var collection = db.get().collection('Product')
    var perPage = 12;
    var p = page || 1;
    if (id != "0") {
        db.get().collection('Category').findOne({ _id: ObjectId(id) }, function (err, result) {
            var categoryId = result.code
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
                }, 
                {
                    $skip: (perPage * p) - perPage
                },
                {
                    $limit: perPage
                },
                {
                    $sort: {_id: 1}
                }
            ]).toArray(function (e, products) {
                collection.find({ category: categoryId }).count(function (e, count) {
                    if (e) return next(e)
                    var callBackString = {}
                    callBackString.title = "Sản phẩm " + (result.name).toUpperCase();
                    callBackString.pages = Math.ceil(count / perPage);
                    callBackString.products = products;
                    callBackString.count = count;
                    cb(null, callBackString);
                })
            })
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
            },
            {
                $skip: (perPage * p) - perPage
            },
            {
                $limit: perPage
            },
            {
                $sort: {_id: 1}
            }
        ]).toArray(function (e, products) {
            console.log(products);
            collection.find({}).count(function (e, count) {
                if (e) return next(e)
                var callBackString = {}
                callBackString.title = "Tất cả sản phẩm";
                callBackString.pages = Math.ceil(count / perPage);
                callBackString.products = products;
                callBackString.count = count;
                cb(null, callBackString);
            })
        })
    }

}