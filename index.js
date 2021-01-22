const express = require('express');
const expressSession = require('express-session');
const pug = require('pug');
const path = require('path');
const route = require('./routes/routes.js');
const bodyParser = require('body-parser');
const cors = require('cors');

let app = express();

app.use(cors());
app.use(expressSession({ secret: "secret", saveUninitialized: true, resave: true }));


const checkAuth = (req,res,next) => {
    if(req.session.user && req.session.user.isAuthenticated) {
        next();
    } else {
        res.redirect('/');
    }
};


app.set('view engine', 'pug');
app.set('views', __dirname+'/views');

app.use(express.static(path.join(__dirname+'/public')));

let urlencodedParser = bodyParser.urlencoded({
    extended: false
});

app.get('/', route.root);
app.post('/', urlencodedParser, route.login);
app.get('/moviePage', checkAuth, route.moviePage);
app.get('/logout', checkAuth, route.logout);
app.get('/editAccount', checkAuth, route.editAccount);
app.post('/updateAccountData', urlencodedParser, route.updateAccountInfo);

app.get('/signup', route.signup)
app.post('/moviePage', urlencodedParser, route.moviePageSearch);
app.post('/sendReview', urlencodedParser, route.test);
app.post('/editReview', urlencodedParser, route.test);
app.get('/:excess', route.root)

app.listen(3000);
