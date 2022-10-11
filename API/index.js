import express from 'express';
import cors from 'cors';
import { getAll, add, getNext } from './db/queueController.js';
import { login, signup } from './db/loginController.js';
const app = express()
const port = 3000

app.use(cors());
app.use(express.json());


// User related APIs
app.post('/login', async (req, res) => {
  try {
    res.cookie('login-cookie-test',123);
    await login(req.body);
    // todo: send back JWT
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(401); 
  }
})

app.post('/signUp', async (req, res) => {
  try {
    await signup(req.body);
    res.sendStatus(200); 
  } catch (error) {
    res.sendStatus(500); 
  }
})

// Queue related APIs
app.get('/getAll', async (req, res) => {
  const allTickets = await getAll();
  console.log('temp', allTickets);
  res.send({text: await getAll()})
})

app.get('/getNext', async (req, res) => {
  const nextTicket = await getNext();
  console.log('next', nextTicket);
  res.send({text: await getNext()})
})

app.post('/addToQueue', async (req, res) => {
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