const bcrypt = require("bcrypt");
const { text } = require("body-parser");
const e = require("express");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/fandingo");

const mdb = mongoose.connection;
mdb.on("error", console.error.bind(console, "connection error:"));
mdb.once("open", function (callback) {});

var accountSchema = mongoose.Schema({
  fname: String,
  lname: String,
  street: String,
  city: String,
  state: String,
  zip_code: String,
  email: String,
  password: String,
  phone: String,
  reviews: Array,
});

var Account = mongoose.model("accounts", accountSchema);

exports.root = (req, res) => {
  Account.find((err, accounts) => {
    if (err) throw err;
    // accounts.forEach(account => {
    //   account.reviews = [];
    // });
    res.render("root", {
      accounts,
    });
  });
};

exports.test = (req, res) => {
  // console.log(req.body.email);
  let rev = {
    review: req.body.review,
    rating: req.body.rating,
    movieId: 2145
  };
  let reviewedMovieBefore = false;

  Account.find({email: req.body.email},(err,account) => {
    if(err) throw err;
    console.log(account)
    account[0].reviews.forEach(review => {
      if(review.movieId == rev.movieId){
        reviewedMovieBefore = true;
      }
    });
    if(reviewedMovieBefore){
      let reviews = account[0].reviews;
      reviews.forEach(review => {
        if(review.movieId == rev.movieId){
          review.rating = rev.rating;
          review.review = rev.review;
        }
      });
      Account.findOneAndUpdate(
        { email: req.body.email },
        { $set: { reviews: reviews } },
        (err, data) => {
          if (err) res.send(err);
          console.log(data);
        }
      );
    }
    else{      
      Account.findOneAndUpdate(
        { email: req.body.email },
        { $push: { reviews: rev } },
        (err, data) => {
          if (err) res.send(err);
          console.log(data);
        }
      );
    }
    res.redirect('/');
  })

};