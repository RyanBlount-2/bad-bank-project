let MongoClient = require('mongodb').MongoClient;
let url = 'mongodb://localhost:27017';
let db = null;

// Connect to Mongo database and perform actions.
MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client) {
   console.log('Successfully Connected To Database Server');

   // Connect to Mongo database.
   db = client.db('myproject');
});

// Create user account.
function create(name, email, password) {
   return new Promise((resolve, reject) => {
      let collection = db.collection('users');
      try {
         collection.insertOne(
            {'name': name, 'email': email, 'password': password, 'balance': 0, 'loggedIn': false, 'displayed': false}
         );
      }
      catch(e) {
         print(e);
      }
   });
};

// Delete user account.
function remove(email) {
   return new Promise((resolve, reject) => {
      let collection = db.collection('users');
      try {
         collection.deleteOne(
            {"email" : email},
            {w : "majority", wtimeout : 100}
         );
      }
      catch (e) {
         print (e);
      }
   });
};

// Login to user account.
function login(email) {
   return new Promise((resolve, reject) => {
      let collection = db.collection('users');
      collection.updateOne(
         {'email': email},
         {$set: {'loggedIn': true, 'displayed': true}}
      );
   });
};

// Logout of user account.
function logout(email) {
   return new Promise((resolve, reject) => {
      let collection = db.collection('users');
      collection.updateOne(
         {'email': email},
         {$set: {'loggedIn': false, 'displayed': false}}
      );
   });
};

// Deposit into user account.
function deposit(email, balance) {
   return new Promise((resolve, reject) => {
      let collection = db.collection('users');
      collection.updateOne(
         {'email': email},
         {$set: {'balance': balance}}
      );
   });
};

// Withdraw from user account.
function withdraw(email, balance) {
   return new Promise((resolve, reject) => {
      let collection = db.collection('users');
      collection.updateOne(
         {'email': email},
         {$set: {'balance': balance}}
      );
   });
};

// Show user account balance.
function balance(email, balance) {
   return new Promise((resolve, reject) => {
      let collection = db.collection('users');
      collection.updateOne(
         {'email': email},
         {$set: {'balance': balance}}
      );
   });
};

// Show all user accounts.
function all() {
   return new Promise((resolve, reject) => {
      let collection = db.collection('users');
      collection
         .find({})
         .toArray(function(err, docs) {
            err ? reject(err) : resolve(docs);
         });
   });
};

module.exports = {create, remove, login, logout, deposit, withdraw, balance, all};
