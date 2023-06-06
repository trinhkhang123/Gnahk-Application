const { int } = require('hardhat/internal/core/params/argumentTypes');
const mongoose = require('mongoose');
const {Schema} = mongoose

const userSchema = new Schema({
    name: String,
    userName: {
        type : String,
        unique: true
    },
    password: String,
    id : Number
})

const UserModel = mongoose.model('User',userSchema);


module.exports = UserModel;