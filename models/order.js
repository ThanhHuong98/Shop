var db = require('../db');
var ObjectId = require('mongodb').ObjectID;
function randomString() {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 7; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
exports.add = function (userID, customerName, phone, address, note, products, cb) {
    var order = db.get().collection('Order');
    var date = new Date();
    console.log(date);
    date.setHours(0,0,0,0);
    date = date.getTime();
    order.insert({
        orderID: randomString(),
        userID : ObjectId(userID),
        customerName: customerName,
        phone : phone,
        address : address,
        note: note,
        status: 0,
        update: date,
        products :  products
    },function(err,result){
        cb(err,result)
    })
}
exports.all = function(userID, cb){
    var order = db.get().collection('Order');
    order.find({userID: ObjectId(userID)}).toArray(function(err,rs){
        cb(err,rs);
    })
}
exports.findOne = function(id, cb){
    var order = db.get().collection('Order');
    order.find({_id: ObjectId(id)}).toArray(function(err,rs){
        cb(err,rs);
    })
}