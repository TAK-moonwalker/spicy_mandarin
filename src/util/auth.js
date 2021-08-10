module.exports.isAuth = (req, res, next) => {
      if (req.isAuthenticated()) {
        return next();
      }else{
          res.render('videos')
          //res.status(401).json({msg : "You are not authrized to view this page"})
      }
    }

    // module.exports = {
    //     isAuth : function(req, res, next){
    //       if(req.isAuthenticated()){
    //         return next
    //       }
    //       req.flash('error_msg', 'Please log in to view this contents')
    //       res.redirect('/login')
    //     }
    // }