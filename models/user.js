const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Define schema

const userSchema = new Schema({
    email: { type: String, unique: true, lowercase: true},
    password: String
})

//Create model

const userModel = mongoose.model('user', userSchema);

//Export model

module.exports = userModel;