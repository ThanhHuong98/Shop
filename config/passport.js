// load all the things we need
var LocalStrategy = require('passport-local').Strategy;

var Account = require('../models/account');

module.exports = function(passport) {

    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        Account.findID(id, function (err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    passport.use(new LocalStrategy({ usernameField: 'email' },
        function (username, password, done) {
            try {       
                Account.find(username, function (err, user) {
                    if (!user) {
                        return done(null, false, { message: 'Email hoặc mật khẩu không hợp lệ' });
                    }
                    Account.validatePass(username, password, function (rs) {
                        if (!rs) {
                            return done(null, false, { message: 'Email hoặc mật khẩu không hợp lệ' });
                        }
                        return done(null, user);
                    })
                })
            } catch (ex) {
                return done(ex);
            }
        })
    );

};