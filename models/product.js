var db = require('../db');

exports.find = function (id, cb) {
    var collection = db.get().collection('Product');

    collection.findOne({ category: "MX" }, (err, result) => {
        console.log(result)
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
