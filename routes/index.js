var express = require('express');
var router = express.Router();
const passport = require('passport');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

//Require our controllers
var home_controller = require('../controllers/homeController');
var product_controller = require('../controllers/productController');
var contact_controller = require('../controllers/contactController')
var blog_controller = require('../controllers/blogController');
var account_controller = require('../controllers/accountController');
var order_controller = require('../controllers/orderController');

//GET | POST ...
// HOME
router.get('/', home_controller.index);
// PRODUCT SECTION
//GET request for list of all Products.
router.get('/list-product/:id/:page', product_controller.pagination);
// GET request for one Product
router.get('/detail-a-product', product_controller.product_detail);
// POST A COMMENT ABOUT PRODUCT
router.post('/detail-a-product',product_controller.post_comment_product);
//SEARCH A PRODUCT
router.post('/search', product_controller.search_product);
// GET request for list of the favorite products
router.get('pages/love-product', product_controller.product_favorite_list)

// CONTACT SECTION
// GET request for creating a Contact
router.get('/contact', contact_controller.contact_create_get);

// BLOG SECTION
//GET request for list of all Blogs.
router.get('/blog', blog_controller.blog_list);
// GET request for one Blog
router.get('/blog-content', blog_controller.blog_detail);

// ACCOUNT SECTION
// register
router.get('/register', account_controller.account_register_get);
router.post('/register', account_controller.account_register_post);
// login
router.get('/login', forwardAuthenticated, account_controller.account_login_get);
//router.post('/login',account_controller.account_login_post);
router.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user) {
        if (err) {
            return next(err);
        }
        if (!user) {
            req.flash('error', 'Email hoặc mật khẩu không hợp lệ!')
            res.redirect('/login');
        }
        else {
            console.log(user.isVerified);
            if (user.isVerified == false) {
                req.flash('error', 'Vui lòng kích hoạt tài khoản trước khi đăng nhập!');
                res.redirect('/login');
            } else{
                req.logIn(user, function (err) {
                    if (err) { return next(err); }
                    res.redirect(req.session.returnTo);
                });
            }
        }
    })(req, res, next);
});
// logout
router.get('/logout', account_controller.logout);

// RESET PASSWORD
router.get('/forget-password', account_controller.account_forget_password_post);
router.post('/email-reset-password', account_controller.email_reset_password);
router.get('/reset-password',account_controller.reset_password_get);
router.post('/reset-password',account_controller.reset_password_post);
// edit - profile


router.get('/edit-profile', ensureAuthenticated, account_controller.account_edit_profile_get);

router.post('/edit-profile', ensureAuthenticated, account_controller.account_edit_profile_post);


// ORDER SECTION
router.get('/cart', order_controller.order_cart);
router.get('/add-to-cart', order_controller.add);
router.get('/increase/:id', order_controller.increase);
router.get('/reduce/:id', order_controller.reduce);
router.get('/remove-cart', order_controller.remove);

router.get('/checkout', ensureAuthenticated, order_controller.order_checkout)
router.post('/place-order', ensureAuthenticated, order_controller.place_order);

router.get('/trackorder/:id', ensureAuthenticated, order_controller.order_trackOrder)
router.get('/order-management', ensureAuthenticated, order_controller.manage)
//CHECK AVAILABILITY
router.post('/check-email', account_controller.check_email)
router.post('/check-pass', account_controller.check_pass)
//VERIFICATION
router.get('/verification',account_controller.verify)

// router.get('/error',function(req,res,cb){
//     res.render('pages/home/error')
// })
module.exports = router;
