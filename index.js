const express = require('express');
const pug = require('pug');
const path = require('path');
const route = require('./routes/routes.js');
const bodyParser = require('body-parser');
const cors = require('cors');

let app = express();

app.use(cors());

app.set('view engine', 'pug');
app.set('views', __dirname+'/views');

app.use(express.static(path.join(__dirname+'/public')));

let urlencodedParser = bodyParser.urlencoded({
    extended: false
});

app.get('/', route.root);
app.get('/:excess', route.root)

app.listen(3000);
