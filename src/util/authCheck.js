module.exports.authCheck = (req,res,next)=>{
    if(req.isAuthenticated()){
        res.locals = {
            auth: true
        }
        next()
        
    } else {
        res.locals = {
            auth: false
        }
        next()
    }
}