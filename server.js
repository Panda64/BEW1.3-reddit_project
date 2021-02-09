// Require Libraries
const express = require('express');


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


// Set db
require('./data/reddit-db');


// Requiring controllers 
const post = require('./controllers/posts.js')(app);
const comment = require('./controllers/comments.js')(app);


// Start Server
app.listen(3000, () => {
    console.log('Reddit clone listening on port localhost:3000!');
  });

  module.exports = app;