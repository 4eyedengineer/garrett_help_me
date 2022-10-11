import MongoClient from 'mongodb';
import { databaseURL as url } from "./connection.config.js"
import { sha256 } from "js-sha256";

export async function login(details) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, function(err, db) {
      if (err) reject(err);
      var dbo = db.db("mydb");
      dbo.collection("users").find({"email": details.email}).toArray(function(err, response) {
        if (err) reject(err);
        db.close();

        console.log("getting user by email: ", response);
        console.log("subpplied pw: ", details.password)
        const dbPassword = response[0]?.password;
        const suppliedPassword = sha256(details.password);
        console.log("db pw: ", dbPassword)
        console.log("subpplied hashed pw: ", suppliedPassword)
        if(dbPassword === suppliedPassword) {
          console.log('success');
          resolve(response);
        } else {
          reject("Passwords Do Not Match");
        }
        
      });
    });
  });
}

export async function signup(details) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("mydb");
      var user = { 
        ...details,
        password: sha256(details.password),
        created_on: new Date()
      };
      console.log('sign up user obj', user)
      dbo.collection("users").insertOne(user, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted: ", res);
        db.close();
        resolve();
      });
    });
  });
}
