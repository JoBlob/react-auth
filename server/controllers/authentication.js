const jwt =require("jwt-simple");
const config = require("../config")
const User = require("../models/user")

function tokenForUser(user){
    const timestamp = new Date().getTime();
    return jwt.encode({ sub:user.id, iat:timestamp }, config.secret);
}

exports.signin = function(req, res, next){
    res.send({token: tokenForUser(req.user)})
}

exports.signup = function(req, res, next) {
    console.log(req.body)
    const email =  req.body.email;
    const password = req.body.password;

    console.log("email:", email)
    console.log("password:", password)

    if(!email || !password) {
        return res.status(422).send({error:"please provide email and password"});
    }
 
    // See if user exists
    User.findOne({email: email}, function(err, existingUser){
        if(err) { return next(err) }

        if(existingUser){
            return res.status(422).send({error: "Email is already used"})
        }

        const user = new User({
            email:email,
            password:password
        })

        user.save(function(err){
            if(err) {return next(err);}

            res.json({token : tokenForUser(user)});
        });
         
    });

}