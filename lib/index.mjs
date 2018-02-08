/*  */

import express from 'express';
import bodyParser from 'body-parser';

import { PORT } from './utils/config';
import { User } from './data-access/index';

const app = express();
// const router = new express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// GET
app.get('/users', (req, res) => User
  .getUsers()
  .then((result) => {
    res.send(result);
  })
  .catch((error) => console.log(error)));

// get lists


// POST
app.post('/add-user', (req, res) => User
  .addUser(((req.body)))
  .then((result) => {
    res.status(200).send(result);
  })
  .catch((error) => console.log(`ERROR: ${error.message}`)));

app.listen(PORT, () => {
  console.log('listening on port 3000');
});
