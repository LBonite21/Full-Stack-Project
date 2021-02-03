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
// router.post('/signup', (req, res, next) => {
//     const recaptchaData = {
//         remoteip: req.connection.remoteAddress,
//         response: _.get(req.body, 'recaptchaResponse'),
//         secret: process.env.RECAPTCHA_SECRET_KEY,
//     };

//     return recaptchaModel.verifyRecaptcha(recaptchaData)
//         .then(() => {
//             const secretKey = "6LdLMj8aAAAAAMgyGmCrT1oKQDZEAc7YhWY68ida";

//             if (req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
//                 return res.json({ "responseError": "Please select captcha first" });
//             }

//             const verificationURL = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;

//             request(verificationURL, function (error, response, body) {
//                 body = JSON.parse(body);

//                 if (body.success !== undefined && !body.success) {
//                     return res.json({ "responseError": "Failed captcha verification" });
//                 }
//                 else {
//                     let body = req.body;
//                     bcrypt.hash(body.password, 10, (err, response) => {
//                         if (err) console.log(err);
//                         let user = new Account({
//                             email: `${body.email}`,
//                             username: `${body.username}`,
//                             password: `${response}`,
//                         });
//                         user.save((err, person) => {
//                             if (err) {
//                                 res.render("signup", {
//                                     errmsg: "Error"
//                                 });
//                             } else {
//                                 res.redirect("/");
//                             }
//                             console.log(`${body.username} added`);
//                         });
//                     });
//                 }
//             });
//         });
// })

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
    let genre_search = `https://api.themoviedb.org/3/discover/movie?api_key=da2444bb6b2f3c7c2a698917f8de85e4&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${encodeURI(genreId)}`;
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
    let query_search = `https://api.themoviedb.org/3/search/multi?api_key=da2444bb6b2f3c7c2a698917f8de85e4&language=en-US&query=${encodeURI(query)}&page=1&include_adult=false`;
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