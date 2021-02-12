// Require Libraries
const dotenv = require('dotenv').config();
const express = require('express');
var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');


// App Setup
const app = express();


// Declaring static files location
app.use(express.static('public'));


// Middleware
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(expressValidator());

app.use(cookieParser());

var checkAuth = (req, res, next) => {
  console.log("Checking authentication");
  if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
    req.user = null;
  } else {
    var token = req.cookies.nToken;
    var decodedToken = jwt.decode(token, { complete: true }) || {};
    req.user = decodedToken.payload;
  }

  next();
};
app.use(checkAuth);

// Set db
require('./data/reddit-db');


// Requiring controllers 
const post = require('./controllers/posts.js')(app);
const comment = require('./controllers/comments.js')(app);
const auth = require('./controllers/auth.js')(app);


// Start Server
app.listen(3000, () => {
    console.log('Reddit clone listening on port localhost:3000!');
  });

  module.exports = app;