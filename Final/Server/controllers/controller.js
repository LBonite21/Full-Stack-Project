let mongoose = require('mongoose');
let account = require('../model/accountModel');
// const recaptchaModel = require('../model/recaptcha');
const bcrypt = require("bcrypt");
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

exports.root = (req, res) => {
    res.send("API is running!");
}

// Lists all the users
exports.list = (req, res) => {
    account.find({}, (err, result) => {
        if (err) res.send(err);
        res.json(result);
    });
}

//handlesignup function
exports.handleSignUp = (req, res) => {
    const secretKey = "6LdLMj8aAAAAAMgyGmCrT1oKQDZEAc7YhWY68ida";
    // const token = req.body.token;
    // const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${token}`;

    if (req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
        return res.json({ "responseError": "Please select captcha first" });
    }

    const verificationURL = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;

    request(verificationURL, function (error, response, body) {
        body = JSON.parse(body);

        if (body.success !== undefined && !body.success) {
            return res.json({ "responseError": "Failed captcha verification" });
        }
        else {
            let body = req.body;
            bcrypt.hash(body.password, 10, (err, response) => {
                if (err) console.log(err);
                let user = new Account({
                    email: `${body.email}`,
                    username: `${body.username}`,
                    password: `${response}`,
                });
                user.save((err, person) => {
                    if (err) {
                        res.render("signup", {
                            errmsg: "Error"
                        });
                    } else {
                        res.json({ "response": true });
                    }
                    console.log(`${body.username} added`);
                });
            });
        }
    });
}

exports.handleSignIn = (req, res) => {
    let name = req.body.username;
    let password = req.body.password;

    account.findOne({ username: name }, (err, account) => {
        if (err) throw err;
        console.log(account.password);
        bcrypt.compare(password, account.password, (err, response) => {
            if (err) console.log(err);

            if (response) {
                res.json({
                    status: true,
                    account: account
                })
            } else {
                res.json({
                    status: false,
                    account: ""
                })
            }
        });
    });
}

exports.searchByGenre = (req, res) => {
    let genreId = req.body.genreId;
    let genre_search = `https://api.themoviedb.org/3/discover/movie?api_key=da2444bb6b2f3c7c2a698917f8de85e4&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${encodeURI(genreId)}&media_type=movie`;
    let request = new XMLHttpRequest();

    request.open('GET', genre_search, true);
    request.onload = () => {
        let result = JSON.parse(request.responseText).results;
        // console.log(result);
        res.json(result);
    }
    request.send();
}
exports.searchByQuery = (req, res) => {
    let query = req.body.query;
    let query_search = `https://api.themoviedb.org/3/search/multi?api_key=da2444bb6b2f3c7c2a698917f8de85e4&language=en-US&query=${encodeURI(query)}&page=1&include_adult=false&media_type=movie`;
    let request = new XMLHttpRequest();

    // console.log(genre_search);

    request.open('GET', query_search, true);
    request.onload = () => {
        let result = JSON.parse(request.responseText).results;
        // console.log(result);
        res.json(result);
    }
    request.send();
}

exports.submitReview = (req, res) => {
    let rev = {
        review: req.body.review,
        rating: req.body.rating,
        movieId: req.body.movieId
    };
    let reviewedMovieBefore = false;

    account.find({ email: req.body.email }, (err, acc) => {
        if (err) throw err;
        console.log(acc)
        acc[0].reviews.forEach(review => {
            if (review.movieId == rev.movieId) {
                reviewedMovieBefore = true;
            }
        });
        if (reviewedMovieBefore) {
            let reviews = acc[0].reviews;
            reviews.forEach(review => {
                if (review.movieId == rev.movieId) {
                    review.rating = rev.rating;
                    review.review = rev.review;
                }
            });
            account.findOneAndUpdate(
                { email: req.body.email },
                { $set: { reviews: reviews } },
                (err, data) => {
                    if (err) res.send(err);
                    console.log(data);
                    res.json(
                        {
                            "username": acc[0].username,
                            "review": req.body.review,
                            "rating": req.body.rating,
                            "movieId": req.body.movieId
                        }
                    );
                }
            );
        }
        else {
            account.findOneAndUpdate(
                { email: req.body.email },
                { $push: { reviews: rev } },
                (err, data) => {
                    if (err) res.send(err);
                    console.log(data);
                    res.json(
                        {
                            "username": acc[0].username,
                            "review": req.body.review,
                            "rating": req.body.rating,
                            "movieId": req.body.movieId
                        }
                    );
                }
            );
        }
    });    
}

exports.makeAdmin = (req, res) => {
    account.updateOne({ email: req.body.email }, { isAdmin: true })
    .then(() => {
        console.log(`${req.body.email} is admin.`);
        res.json({
            "success": true
        });
    })
    .catch((err) => {
        res.json({
            "success": false
        });
    });
}
exports.makeNotAdmin = (req, res) => {
    account.updateOne({ email: req.body.email }, { isAdmin: false })
    .then(() => {
        console.log(`${req.body.email} is not admin.`);
        res.json({
            "success": true
        });
    })
    .catch((err) => {
        res.json({
            "success": false
        });
    });
}

exports.updateAccount = (req, res) => {
    if (req.body.resetPassword) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            let myHash = hash;
            account.findOneAndUpdate(
              { email: req.body.email },
              {
                $set: {
                  username: req.body.username, password: myHash, fname: req.body.fname, lname: req.body.lname, email: req.body.email,
                  street: req.body.street, city: req.body.city, state: req.body.state, zip_code: req.body.zip_code, phone: req.body.phone
                }
              },
              (err, data) => {
                if (err) res.json({
                    "success": false,
                    "error": err
                });
                console.log(data);
                res.json({
                    "success": true,
                    "data": data
                });
            });
        });
    } else {
        account.findOneAndUpdate(
        { email: req.body.email },
        {
            $set: {
            username: req.body.username, fname: req.body.fname, lname: req.body.lname, email: req.body.email,
            street: req.body.street, city: req.body.city, state: req.body.state, zip_code: req.body.zip_code, phone: req.body.phone
            }
        }, (err, data) => {
            if (err) res.json({
                "success": false,
                "error": err
            });
            console.log(data);
            res.json({
                "success": true,
                "data": data
            });
        });
    }
}

exports.deleteAccount = (req, res) => {
    account.deleteOne({ email: req.body.email })
    .then(() => {
        console.log(`${req.body.email} was deleted`);
        res.json({
            "success": true
        });
    }).catch((err) => {
        res.json({
            "success": false
        });
    });
}
exports.deleteReview = (req, res) => {
    account.updateOne({ username: req.body.username }, { $pull: { "reviews": { "movieId": req.body.movieId } } }, { safe: true, multi: true })
    .then(() => {
        console.log(`${req.body.movieId} was deleted`);
        res.json({
            "success": true
        });
    }).catch((err) => {
        res.json({
            "success": false
        });
    });
}