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

        if (response.length === 0){
          reject("No Email Exists");
        }
        db.close();
        const dbUser = response[0];
        const userDetails = {
          email: dbUser.email,
          created_on: dbUser.created_on,
          isAdmin: dbUser.admin,
          id: response.insertedId
        };

        const dbPassword = dbUser.password;
        const suppliedPassword = sha256(details.password);

        if(dbPassword === suppliedPassword) {
          console.log("login success.");
          resolve(userDetails);
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
        admin: false,
        created_on: new Date()
      };
      dbo.collection("users").insertOne(user, function(err, response) {
        if (err) throw err;
        db.close();
        const newUser = {
          email: user.email,
          created_on: user.created_on,
          isAdmin: user.admin,
          id: response.insertedId
        };
        resolve(newUser);
      });
    });
  });
}
