const User = require("./models/user");
const bcrypt = require("bcrypt");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;

//config passport can also do this inside server.js
module.exports =  function(passport){
    passport.use(
        new localStrategy((username, password, done) => {
            User.findOne({username: username}, (err, user) => {
                if (err) console.log(err);
                if (!user) return done(null, false);
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) console.log(err);
                    if (result === true){
                        return done(null, user);
                    }
                    else{
                        return done(null, false);
                    }
                })
            })
        })
    );

    //serialise user
    passport.serializeUser((user,cb) => {
        cb(null, user.id); //create cookie with userid
    })
    //unravel cookie
    passport.deserializeUser((id, cb) => {
        User.findOne({_id: id}, (err, user) => {
            cb(err, user);
        });
    });
}