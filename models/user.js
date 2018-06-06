const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
//Define schema

const userSchema = new Schema({
    email: { type: String, unique: true, lowercase: true},
    password: String
})

//On save hook, encrypt password

//before saving the model, run this function
userSchema.pre('save', function(next){
    const user = this;
    // generate salt( random string of numbers and characters)
    bcrypt.genSalt(10, function(err, salt){
        if(err) { return next(err);}
        //salt plus plain text pwd gives the hash password.
        bcrypt.hash(user.password, salt, null, function(err,hash) {
            if(err) { return next(err); }
            //hash password save it to user.password
            user.password = hash;
            next(); 
        })
    })
})

//Create model

const userModel = mongoose.model('user', userSchema);

//Export model

module.exports = userModel;