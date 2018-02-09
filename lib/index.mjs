/*  */

import express from 'express';
import bodyParser from 'body-parser';

import { connect } from './db-connection';
import { CONFIG } from './utils/config';
import { User } from './data-access/index';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

connect()
  .then(() => {
    console.log('Database connected.');
  })
  .catch(err => console.log(err));

// GET
app.get('/users', (req, res) => User
  .getUsers()
  .then((result) => {
    res.send(result);
  })
  .catch((error) => console.log(error)));

// get lists


// POST
// app.post('/add-user', (req: express$Request, res: express$Response) => User
//   .addUser(((req.body: any): TUser))
//   .then((result: Object) => {
//     res.status(200).send(result);
//   })
//   .catch((error: Error) => console.log(`ERROR: ${error.message}`)));

app.listen(CONFIG.PORT, () => {
  console.log('listening on port 3000');
});
