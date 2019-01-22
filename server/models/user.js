const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");

// define our model
const userSchema = new Schema({
    email : {type: String, unique: true, lowercase: true},
    password: String
});

// on save hook encrypt password
// pre runs hook before save and runs function
userSchema.pre("save", function(next){
    const user = this;

    // generate salt then run callback function
    bcrypt.genSalt(10, function(err, salt){

        if(err) {return next(err);}

        // encrypt(hash) password using salt
        bcrypt.hash(user.password, salt, null, function(err, hash) {

            if(err) {return next(err)}
            user.password = hash;
            next();
        })
    })
})

userSchema.methods.comparePassword = function(candidatePassword, callback){
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
        
        if(err) return callback(err)
        
        callback(null, isMatch)
    })
}
// assign model to user class
const ModelClass = mongoose.model("user", userSchema);

module.exports = ModelClass;