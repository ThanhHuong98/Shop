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
exports.add = function (email, pass, name, phone, address, token, cb) {
    var collection = db.get().collection("Customer");
    var role = 0;
    var date = new Date();
    date.setHours(0,0,0,0);

    bcrypt.hash(pass, saltRounds, function (error, hash) {
        collection.insert({
            email: email,
            pass: hash,
            role: role,
            name: name,
            phone: phone,
            address: address,
            isVerifed: false,
            token: token,
            update: date.getTime()
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
exports.validatePass = function (email, pass, cb) {
    var collection = db.get().collection("Customer");
    collection.findOne({ email: email }, function (err, user) {
        bcrypt.compare(pass, user.pass, function (error, rs) {
            cb(rs);
        })
    })
}
exports.edit = function (id, name, phone, address, pass, cb) {
    var collection = db.get().collection("Customer");
    if (pass) {
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
exports.verify = function (email, token, cb) {
    var account = db.get().collection('Customer');
    account.findOne({ email: email, token: token }, function (err, rs) {
        if (rs) {
            account.update({ _id: ObjectId(rs._id) },
                {
                    $set: {
                        isVerifed: true
                    }
                }, function (error, result) {
                    cb(error, result)
                })
        }
    })
}
exports.addResetPassToken = function (id, token, cb) {
    var account = db.get().collection('Customer');
    account.update(
        {
            _id: ObjectId(id)
        },
        {
            $set:
            {
                ResetPassToken: token
            }
        }, function (err, rs) {
            cb(err, rs);
        }
    )
}
exports.checkResetPassToken = function (email, token, cb) {
    var account = db.get().collection('Customer');
    account.findOne({ email: email, ResetPassToken: token }, function (err, rs) {
        cb(rs);
    })
}
exports.reset_password = function (id, pass, cb) {
    var account = db.get().collection('Customer');
    bcrypt.hash(pass, saltRounds, function (error, hash) {
        account.update(
            {
                _id: ObjectId(id)
            },
            {
                $set:
                {
                    pass: hash
                }
            }, function (err, rs) {
                if (rs) {
                    account.findOne({ _id: ObjectId(id) }, function (e, result) {
                        cb(result);
                    })
                }
            })
    })
}