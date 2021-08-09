const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');
require('../src/db/mongoose');
const UserModel = require('../src/models/uder-model');



// 1,pass to passport.use method the strategy and varify callback to passport object to configure
// namefield expexted from "req.body" object
const customFields = {
    usernameField: 'email',
    passwordField: 'password'
}

// const strategy = new LocalStrategy(customFields, (username, password, done)=>{

//     UserModel.findOne({ email: username })
//     .then((user) => {

//         if (!user) { return done(null, false) }
        
//         const isValid = bcrypt.compare(password, user.password);
        
//         if (isValid) {
//             return done(null, user);
//         } else {
//             return done(null, false);
//         }
//     })
//     .catch((err) => {   
//         done(err);
//     });

// });

const strategy = new LocalStrategy(customFields, async (username, password, done)=>{

   try{
   const user = await UserModel.findOne({ email: username })

        if (!user) {
            return done(null, false)
        }
        
        const isValid = await bcrypt.compare(password, user.password);

        if (isValid) {
            return done(null, user);
        } else {
            return done(null, false);
        }
}catch(err){
    done(err);
}

});


passport.use(strategy);

// serialize do put user in session and grab data from session
passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    UserModel.findById(id, function(err, user) {
      done(err, user);
    });
  });