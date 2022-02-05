var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";


async function add(details) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("mydb");
      var myobj = { 
        name: details.name,
        phone: details.phone,
        notes: details.notes,
        created_on: new Date()
      };
      dbo.collection("customers").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted: ", res);
        db.close();
        resolve();
      });
    });
  });
}
async function getAll() {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("mydb");
      dbo.collection("customers").find({}).toArray(function(err, res) {
        if (err) throw err;
        console.log("getting all items: ", res);
        db.close();
        resolve(sortOldestFirst(res));
      });
    });
  });
}

async function getNext() {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("mydb");
      dbo.collection("customers").find({}).toArray(function(err, res) {
        if (err) throw err;
        console.log(`getting oldest obj with result: ${res}`);
        db.close();
        resolve(sortOldestFirst(res)[0]);
      });
    });
  });
}

async function complete(id) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("mydb");
      dbo.collection("customers").deleteOne({_id: id}).toArray(function(err, res) {
        if (err) throw err;
        console.log(`deleting obj with id: ${id} with result: ${res}`);
        db.close();
        resolve();
      });
    });
  });
}

function sortOldestFirst(array) {
  return array.sort((a, b) => new Date(a.created_on) - new Date(b.created_on));
}

module.exports = {
  getAll,
  getNext,
  add,
  complete
}