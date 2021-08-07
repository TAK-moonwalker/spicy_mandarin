const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');
require('../src/db/mongoose');
const UserModel = require('../src/models/uder-model');



// 1,pass to passport.use method the strategy and varify callback to passport object to configure

const customFields = {
    usernameField: 'email',
    passwordField: 'password'
}

const strategy = new LocalStrategy(customFields, (username, password, done)=>{

    UserModel.findOne({ email: username })
    .then((user) => {

        if (!user) { return done(null, false) }
        
        const isValid = bcrypt.compareSync(password, user.hash);
        
        if (isValid) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    })
    .catch((err) => {   
        done(err);
    });

});


passport.use(strategy);

// serialize do put user in session and grab data from session
passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });