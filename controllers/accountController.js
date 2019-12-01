var Category = require('../models/category');
var Account = require('../models/account');
const nodemailer = require("nodemailer");

//add more model if need
function randomString() {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 10; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
async function sendMail(url, email) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'floralstore12345@gmail.com',
            pass: 'happyfamily'
        }
    });
    let info = await transporter.sendMail({
        from: '[FLORAL] VERIFICATION',
        to: email,
        subject: "[FLORAL] Kích hoạt tài khoản",
        text: "Vui lòng truy cập đường dẫn sau để kích hoạt tài khoản của bạn :" + url
    });
}
async function sendResetPassMail(url, email) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'floralstore12345@gmail.com',
            pass: 'happyfamily'
        }
    });
    let info = await transporter.sendMail({
        from: '[FLORAL] RESET PASSWORD',
        to: email,
        subject: "[FLORAL] Thay đổi mật khẩu",
        text: "Vui lòng truy cập đường dẫn sau để thiết lập mật khẩu mới cho tài khoản của bạn :" + url
    });
}
exports.account_login_get = function (req, res, next) {
    Category.allCategory(function (err, cb) {
        if (err) {
            return next(err);
        }
        res.render('pages/account/login', { listCategory: cb })
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
                res.render('pages/account/register', { listCategory: callback, error: s });
            } else {
                var token = randomString();
                var s = req.protocol + '://' + req.get('host') + '/verification?email=' + email + '&&token=' + token;
                sendMail(s, email);
                Account.add(email, pass, name, phone, address, token, function (rs) {
                    req.flash('msg', 'Vui lòng kiểm tra hộp thư và kích hoạt tài khoản trước khi đăng nhập!');
                    res.redirect('/login');
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
    var id = req.user._id
    Category.allCategory(function (error, cb) {
        if (error) {
            return next(err);
        }
        Account.findID(id, function (err, rs) {
            res.render('pages/account/profileEdit', { listCategory: cb, account: rs })
        })
    })
}
exports.account_edit_profile_post = function (req, res, next) {
    var id = req.user._id;
    var name = req.body.name;
    var phone = req.body.phone;
    var address = req.body.address;
    var pass = req.body.newpass;
    Account.edit(id, name, phone, address, pass, function (err, cb) {
        if (err) {
            return next(err);
        }
        res.redirect("/edit-profile/");
        //res.redirect('/')
    })
}

exports.check_email = function (req, res, next) {
    var email = req.body.email;
    Account.checkEmail(email, function (err, data) {
        res.send(data)
    })
}

exports.check_pass = function (req, res, next) {
    var id = req.body.email;
    var pass = req.body.pass;
    Account.validatePass(email, pass, function (cb) {
        if (!cb) {
            res.status(400).send("Mật khẩu cũ không hợp lệ")
        } else {
            next(cb);
        }
    })
}

exports.logout = function (req, res, next) {
    req.logout();
    res.redirect('/');
}

exports.verify = function (req, res, next) {
    var email = req.query.email;
    var token = req.query.token;
    
    Account.verify(email, token, function (err, rs) {
        req.flash('msg', 'Tài khoản đã được kích hoạt!\nBạn có thể đăng nhập');
        res.redirect('/login');
    })
}

exports.email_reset_password = function (req, res, next) {
    var email = req.body.email;
    Account.find(email, function (error, result) {
        if (result) {
            var token = randomString();
            var s = req.protocol + '://' + req.get('host') + '/reset-password?email=' + email + '&&token=' + token;
            sendResetPassMail(s, email);
            Account.addResetPassToken(result._id, token, function (err, rs) {
                req.flash('msg','Vui lòng kiểm tra hộp thư và làm theo hướng dẫn để thiết lập mật khẩu mới');
                res.redirect('/forget-password');
            })
        }
    })
}
exports.reset_password_get = function(req, res, next){
    var email = req.query.email;
    var token = req.query.token;
    Account.checkResetPassToken(email,token,function(cb){
        if(cb){
            Category.allCategory(function (err, rs) {
                if (err) {
                    return next(err);
                }
                res.render('pages/account/reset-password', { listCategory: rs, id: cb._id  })
            })
        }
    })
}

exports.reset_password_post = function(req, res, next){
    var pass = req.body.pass;
    var id = req.body.id;
    Account.reset_password(id,pass,function(rs){
        if(rs){
            res.redirect('/');
        }
    })
}