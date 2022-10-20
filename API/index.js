import express from 'express';
import cors from 'cors';
import { getAll, add, getNext } from './db/queueController.js';
import { login, signup } from './db/loginController.js';
import { expressjwt } from "express-jwt";
import * as fs from "fs";
import { getBearerToken } from './db/auth.js';
const app = express()
const port = 3000

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

const RSA_PRIVATE_KEY = fs.readFileSync('./keys/jwtRS256.key');
const RSA_PUBLIC_KEY = fs.readFileSync('./keys/public.key');

const checkIfAuthenticated = expressjwt({
  algorithms: ["RS256"],
  secret: RSA_PUBLIC_KEY
});


// User related APIs
app.post('/login', async (req, res) => {
  try {
    let user = await login(req.body);
    user = {
      ...user,
      ...getBearerToken(user.id,RSA_PRIVATE_KEY)
    }
    res.status(200).send(user); 
  } catch (error) {
    res.status(401).send(error)
  }
})

app.post('/signUp', async (req, res) => {
  try {
    let newUser = await signup(req.body);
    newUser = {
      ...newUser,
      ...getBearerToken(user.id,RSA_PRIVATE_KEY)
    }
    res.status(200).send(newUser); 
  } catch (error) {
    res.sendStatus(500); 
  }
})

// Queue related APIs
app.get('/getAll', checkIfAuthenticated, async (req, res) => {
  const allTickets = await getAll();
  console.log('temp', allTickets);
  res.send({text: await getAll()})
})

app.get('/getNext', checkIfAuthenticated, async (req, res) => {
  const nextTicket = await getNext();
  console.log('next', nextTicket);
  res.send({text: await getNext()})
})

app.post('/addToQueue', checkIfAuthenticated, async (req, res) => {
  try {
    const result = await add(req.body);
    res.sendStatus(200); 
  } catch (error) {
    res.sendStatus(500); 
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})