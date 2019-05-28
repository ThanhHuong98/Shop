var url = require('url');
var Product = require('../models/account');
var Category = require('../models/category');
var Account = require('../models/account');
//add more model if need

exports.account_login_get = function (req, res, next) {
    Category.allCategory(function (err, cb) {
        if (err) {
            return next(err);
        }
        res.render('pages/account/login', { listCategory: cb })
    })
}

exports.account_login_post = function (req, res, next) {
    Category.allCategory(function (error, callback) {
        if (error) {
            return next(error);
        }
        var email = req.body.email;
        var pass = req.body.password;
        Account.find(email, function (err, cb) {
            if (!cb) {
                var s = "Email hoặc mật khẩu không hợp lệ";
                res.render('pages/account/login',{ listCategory: callback, error: s});                
            }else 
            {
                Account.validatePass(cb._id,pass,function(rs){
                    if(!rs)
                    {
                        var s = "Email hoặc mật khẩu không hợp lệ";
                        res.render('pages/account/login',{ listCategory: callback, error: s}); 
                    }
                    else
                    {
                        res.redirect('/edit-profile/'+cb._id); 
                    }
                })
            }
        });
    })
}

exports.account_register_get = function (req, res, next) {
    Category.allCategory(function (err, cb) {
        if (err) {
            return next(err);
        }
        res.render('pages/account/register', { listCategory: cb })
    })
}

exports.account_register_post = function (req, res, next) {
    Category.allCategory(function (error, callback) {
        if (error) {
            return next(error);
        }
        var email = req.body.email;
        var pass = req.body.password;
        var name = req.body.name;
        var phone = req.body.phone;
        var address = req.body.address;
        Account.find(email, function (err, cb) {
            if (cb) {
                var s = "Email không hợp lệ";
                res.render('pages/account/register',{ listCategory: callback, error: s});                
            }else { 
                Account.add(email, pass,name,phone,address, function(rs){
                    res.redirect('/edit-profile/'+rs._id); 
                })                 
            }
        });
    })
}

exports.account_forget_password_post = function (req, res, next) {
    Category.allCategory(function (err, cb) {
        if (err) {
            return next(err);
        }
        res.render('pages/account/forget-password', { listCategory: cb })
    })
}

exports.account_edit_profile_get = function (req, res, next) {
    var id = req.params.id;
    Category.allCategory(function (error, cb) {
        if (error) {
            return next(err);
        }
        Account.findID(id , function(err,rs){
            res.render('pages/account/profileEdit', { listCategory: cb, account: rs })
        })
    })
}
exports.account_edit_profile_post = function (req, res, next) {    
    var id = req.params.id;
    var name = req.body.name;
    var phone = req.body.phone;
    var address = req.body.address;
    var pass = req.body.newpass;
    Account.edit(id,name,phone,address,pass,function(err,cb){
        res.redirect("/edit-profile/"+id);
    })
}

exports.check_email= function(req, res, next){
    var email = req.body.email;
    Account.checkEmail(email,function(err, data){
        res.send(data)
    })
}

exports.check_pass =function(req,res,next){
    var id = req.body.id;
    var pass = req.body.pass;
    Account.validatePass(id,pass,function(cb){
        if(!cb){
            res.status(400).send("Mật khẩu cũ không hợp lệ")
        }else{
            next(cb);
        }
    })
}


