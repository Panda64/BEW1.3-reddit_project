// Require Libraries
const express = require('express');


// App Setup
const app = express();


// Declaring static files location
app.use(express.static('public'));


// Middleware
const exphbs  = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


// Routes
app.get('/', (req, res) => {
    res.render('index')
  })


// Start Server
app.listen(3000, () => {
    console.log('Reddit clone listening on port localhost:3000!');
  });