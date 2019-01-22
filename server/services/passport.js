const passport = require("passport");
const User = require("../models/user");
const config = require("../config");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local")

const localOptions = {usernameField: "email"};

const localLogin = new LocalStrategy(localOptions, function(email, password, done){
    User.findOne({email:email}, function(err, user){

        if(err) return done(err)
        
        if(!user) return done(null, false)

        user.comparePassword(password, function(err, isMatch){
            if(err) return done(err)

            if(!isMatch) return done(null, false)

            return done(null, user)
        })
         
    })
});
// setup otions for jwt strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader("authorization"),
    secretOrKey: config.secret
}

// create strategy --- payload: decoded jwt token, done: callback function
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
    // see if userId in payload exists in DB, if it does call done with user, else call done with userObject
    User.findById(payload.sub, function(err, user){

        if(err) return done(err, false)

        if(user) done(null, user)

        else done(null, false)
    });
});

// tell passport to use Strategy
passport.use(jwtLogin)
passport.use(localLogin)