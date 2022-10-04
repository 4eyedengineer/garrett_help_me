import express from 'express';
import cors from 'cors';
import { getAll, add, getNext } from './db/mongoController.js';
const app = express()
const port = 3000

app.use(cors());
app.use(express.json());

app.get('/getAll', async (req, res) => {
  res.cookie('test',123);
  const temp = await getAll();
  console.log('temp', temp);
  res.send({text: await getAll()})
})

app.get('/getNext', async (req, res) => {
  const temp = await getNext();
  console.log('next', temp);
  res.send({text: await getNext()})
})

app.post('/addToQueue', async (req, res) => {
  console.log(req.body);
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