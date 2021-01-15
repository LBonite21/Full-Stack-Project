const bcrypt = require("bcrypt");
const { text, json } = require("body-parser");
const e = require("express");
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

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

let genres = "https://api.themoviedb.org/3/genre/movie/list?api_key=da2444bb6b2f3c7c2a698917f8de85e4&language=en-US"; 

const returnGenreId = genreName => {
  
}

exports.root = (req, res) => {
  Account.find((err, accounts) => {
    if (err) throw err;
    res.render("root", {
      accounts,
    });
  });
};

exports.moviePage = (req, res) => {
  res.render('moviePage', {
    accountData: req.session.user.account
  });
}

exports.moviePageSearch = (req, res) => {
  // Use search terms to get API data back.
  let genre_search;
  let title_search
  let actor_search;
  let title = req.body.title;
  let actor = req.body.actor;
  let genreId; 
  
  // Priorities TITLE as a search and then GENRE and then ACTORS
  if (title) {
    title_search = `https://api.themoviedb.org/3/search/movie?api_key=da2444bb6b2f3c7c2a698917f8de85e4&language=en-US&query=${encodeURI(title)}&page=1&include_adult=false`;
    let request = new XMLHttpRequest();

    request.open('GET', title_search, true);

    request.onload = () => {
      res.render('layout', {
        movieList: JSON.parse(request.responseText)
      });
    }

    request.send();
    console.log(true)
  }
  if (actor) {
    actor_search  = `https://api.themoviedb.org/3/search/person?api_key=da2444bb6b2f3c7c2a698917f8de85e4&language=en-US&query=${encodeURI(actor)}&page=1&include_adult=false`;
    let request = new XMLHttpRequest();

    request.open('GET', actor_search, true);

    request.onload = () => {
      res.render('layout', {
        movieList: JSON.parse(request.responseText)
      });
    }

    request.send();
  }
  if (req.body.genre) {
    // console.log(returnGenreId(req.body.genre));
    // console.log(genre);
    let request = new XMLHttpRequest();

    request.open('GET', genres, true);

    request.onload = () => {
      let data = JSON.parse(request.responseText);
      if (data) {
        data.genres.forEach(genre => {
          if (genre.name.toLowerCase() == req.body.genre.toLowerCase()) {
            genreId = genre.id;
            genre_search = `https://api.themoviedb.org/3/discover/movie?api_key=da2444bb6b2f3c7c2a698917f8de85e4&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${encodeURI(genreId)}`;
          
            // TODO Fetch Genre movies
            // res.render('moviePage', {
            //   movieList: ""//stuff
            // });
          }
        });
      } else {
        console.log('Genre List has not loaded yet.')
      }
    }

    request.send();
  }
}

exports.login = (req, res) => {
  Account.findOne({email : req.body.email}, (err, account) => {
    if (err) throw err;
    bcrypt.compare(req.body.password, account.password, (err, response) => {
      if (err) console.log(err);
      
      if (response) {
        req.session.user = {
          isAuthenticated: true,
          account: account
        }
        res.redirect('/moviePage');
      } else {
        res.redirect('/');
      }
    });
  });
}

exports.test = (req, res) => {
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