module.exports = {
    ensureAuthenticated : function(req,res,next){
        console.log("is Authenticated: "+ req.isAuthenticated());
        if(req.isAuthenticated()){
            return next();
        }
        req.flash('error','Vui lòng đăng nhập để tiếp tục');
        res.redirect('/login');
    },
    forwardAuthenticated: function(req, res, next) {
      if (!req.isAuthenticated()) {
        return next();
      }
      res.redirect('/');      
    }
  };