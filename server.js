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

// Requiring controllers 
const post = require('./controllers/posts.js')(app);

// Set db
require('./data/reddit-db');

// Routes
app.get('/', (req, res) => {
    res.render('home')
  })

app.get('/posts/new', (req, res) => {
    res.render('post-new')
  })  


// Start Server
app.listen(3000, () => {
    console.log('Reddit clone listening on port localhost:3000!');
  });

  module.exports = app;