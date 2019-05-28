var db = require('../db');
var bcrypt = require('bcrypt');
var ObjectId = require('mongodb').ObjectID;
var saltRounds = 10;

exports.all = function (cb) {
    var collection = db.get().collection('Customer');

    collection.find().toArray(function (err, docs) {
        cb(err, docs)
    })
}
exports.find = function (email, cb) {
    var collection = db.get().collection('Customer');
    collection.findOne({ email: email }, function (err, rs) {
        cb(err, rs)
    })
}
exports.findID = function (id, cb) {
    var collection = db.get().collection('Customer');
    collection.findOne({ _id: ObjectId(id) }, function (err, rs) {
        cb(err, rs)
    })
}
exports.add = function (email, pass, name, phone, address, cb) {
    var collection = db.get().collection("Customer");
    bcrypt.hash(pass,saltRounds,function(error,hash){
        collection.insert({
            email: email,
            pass: hash,
            role: 0,
            name: name,
            phone: phone,
            address: address
        }, function (err, rs) {
            if (rs) {
                collection.findOne({ email: email }, function (error, result) {
                    cb(result);
                })
            }
        })
    })
}

exports.checkEmail = function (email, cb) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!regex.test(email)) {
        cb(null, '<span style="color:#EC501F" id="prevent-register">Email không hợp lệ</span>');
        return;
    }
    var collection = db.get().collection("Customer");
    collection.findOne({ email: email }, function (err, rs) {
        if (rs) {
            cb(null, '<span style="color:#EC501F" id="prevent-register">Email không hợp lệ</span>');
        } else {
            cb(null, '<span style="color:#01A3A4">Email hợp lệ</span>');
        }
    })
}
exports.validatePass = function (id, pass, cb) {
    var collection = db.get().collection("Customer");
    collection.findOne({ _id: ObjectId(id)}, function (err, user) {
        bcrypt.compare(pass,user.pass,function(error,rs){
            cb(rs);
        })
    })
}
exports.edit = function (id, name, phone, address, pass, cb) {
    var collection = db.get().collection("Customer");
    if (pass) {
        console.log("update pass")
        collection.update({ _id: ObjectId(id) },
            {
                $set: {
                    name: name,
                    phone: phone,
                    address: address,
                    pass: pass,
                }
            }, function (err, doc) {
                cb(err, cb)
            })
    } else {
        collection.update({ _id: ObjectId(id) },
            {
                $set: {
                    name: name,
                    phone: phone,
                    address: address
                }
            }, function (err, doc) {
                cb(err, cb)
            })
    }
}