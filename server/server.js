let express = require('express');
let app = express();
let cors = require('cors');
let dal = require('./dal.js');

// Serve static files from public directory.
app.use(express.static('public'));
app.use(cors());

app.get('/', (req, res) => {
   res.send('Working!')
});

// Create user account. Express calls the DAL.
app.get('/account/create/:name/:email/:password/:balance/:loggedIn/:displayed', function(req, res) {
   dal.create(req.params.name, req.params.email, req.params.password, req.params.balance, req.params.loggedIn, req.params.displayed)
      .then((user) => {
         console.log(user);
         res.send(user);
      });
});

// Delete user account. Express calls the DAL.
app.get('/account/remove/:email', function(req, res) {
   dal.remove(req.params.email)
      .then((user) => {
         console.log(user);
         res.send(user);
      });
});

// Login to user account. Express calls the DAL.
app.get('/account/login/:email', function(req, res) {
   dal.login(req.params.email)
      .then((user) => {
         console.log(user);
         res.send(user);
      });
});

// Logout of user account. Express calls the DAL.
app.get('/account/logout/:email', function(req, res) {
   dal.logout(req.params.email)
      .then((user) => {
         console.log(user);
         res.send(user);
      });
});

// Deposit into user account. Express calls the DAL.
app.get('/account/deposit/:email/:balance', function(req, res) {
   dal.deposit(req.params.email, req.params.balance)
      .then((user) => {
         console.log(user);
         res.send(user);
      });
});

// Withdraw from user account. Express calls the DAL.
app.get('/account/withdraw/:email/:balance', function(req, res) {
   dal.withdraw(req.params.email, req.params.balance)
      .then((user) => {
         console.log(user);
         res.send(user);
      });
});


// Show user account balance. Express calls the DAL.
app.get('/account/balance/:email/:balance', function(req, res) {
   dal.balance(req.params.email, req.params.balance)
      .then((user) => {
         console.log(user);
         res.send(user);
      });
});

// Show all user accounts. Express that calls the DAL.
app.get('/account/all', function(req, res) {
   dal.all()
      .then((docs) => {
         console.log(docs);
         res.send(docs);
      });
});

let port = 3001;
app.listen(port);
console.log('Connected Successfully To The Server - Running On Port: ' + port);
