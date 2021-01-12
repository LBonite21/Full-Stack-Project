const bcrypt = require('bcrypt');
const { text } = require('body-parser');
const e = require('express');

let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017');

let mdb = mongoose.connection;
mdb.on('error', console.error.bind(console, 'connection error:'));
mdb.once('open', function (callback) {

});

var accountSchema = mongoose.Schema({
    fname: String,
    lname: String,
    street: String,
    city: String,
    state: String,
    zip_code: String,
    email: String,
    password: Buffer,
    phone: String,
    reviews: Array
});

var Account = mongoose.model('Account_Collection', accountSchema);

exports.root = (req,res) => {
    if(err) throw err;
    res.render('root');
}