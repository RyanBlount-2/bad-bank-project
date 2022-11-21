const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://badbankuser:badbankpassword@badbankcluster.dugi8m4.mongodb.net/?retryWrites=true&w=majority';
let db = null;

MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client) {
   console.log('Connected Successfully To The Database');

   db = client.db('badbankdatabase');
});

// Create user account.
function create(name, email, password) {
   return new Promise((resolve, reject) => {
      let collection = db.collection('badbankcollection');
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
      let collection = db.collection('badbankcollection');
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
      let collection = db.collection('badbankcollection');
      collection.updateOne(
         {'email': email},
         {$set: {'loggedIn': true, 'displayed': true}}
      );
   });
};

// Logout of user account.
function logout(email) {
   return new Promise((resolve, reject) => {
      let collection = db.collection('badbankcollection');
      collection.updateOne(
         {'email': email},
         {$set: {'loggedIn': false, 'displayed': false}}
      );
   });
};

// Deposit into user account.
function deposit(email, balance) {
   return new Promise((resolve, reject) => {
      let collection = db.collection('badbankcollection');
      collection.updateOne(
         {'email': email},
         {$set: {'balance': balance}}
      );
   });
};

// Withdraw from user account.
function withdraw(email, balance) {
   return new Promise((resolve, reject) => {
      let collection = db.collection('badbankcollection');
      collection.updateOne(
         {'email': email},
         {$set: {'balance': balance}}
      );
   });
};

// Show user account balance.
function balance(email, balance) {
   return new Promise((resolve, reject) => {
      let collection = db.collection('badbankcollection');
      collection.updateOne(
         {'email': email},
         {$set: {'balance': balance}}
      );
   });
};

// Show all user accounts.
function all() {
   return new Promise((resolve, reject) => {
      let collection = db.collection('badbankcollection');
      collection
         .find({})
         .toArray(function(err, docs) {
            err ? reject(err) : resolve(docs);
         });
   });
};

module.exports = {create, remove, login, logout, deposit, withdraw, balance, all};
