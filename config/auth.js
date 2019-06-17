module.exports = {
    ensureAuthenticated : function(req,res,next){
        if(req.isAuthenticated()){
            return next();
        }else{
        req.session.returnTo = req.originalUrl;
        req.flash('error','Vui lòng đăng nhập để tiếp tục');
        res.redirect('/login');}
    },
    forwardAuthenticated: function(req, res, next) {
      if (!req.isAuthenticated()) {
        return next();
      }
      res.redirect('/');      
    }
  };