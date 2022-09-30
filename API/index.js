// const express = require('express')
import { Express as express } from 'express'
const bodyParser = require('body-parser')
const cors = require('cors')
const dbCtrl = require('./db/mongoController')
const app = express()
const port = 3000

app.use(cors());
app.use(express.json());

app.get('/getAll', async (req, res) => {
  res.cookie('test',123);
  const temp = await dbCtrl.getAll();
  console.log('temp', temp);
  res.send({text: await dbCtrl.getAll()})
})

app.get('/getNext', async (req, res) => {
  const temp = await dbCtrl.getNext();
  console.log('next', temp);
  res.send({text: await dbCtrl.getNext()})
})

app.post('/addToQueue', async (req, res) => {
  console.log(req.body);
  try {
    const result = await dbCtrl.add(req.body)
    res.sendStatus(200); 
  } catch (error) {
    res.sendStatus(500); 
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})