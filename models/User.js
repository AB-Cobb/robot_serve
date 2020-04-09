const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = new Schema({
    username : { type : String},
    fname : { type : String},
    lname : { type : String},
    password : {type : String}
})

module.exports = mongoose.model('User', User)