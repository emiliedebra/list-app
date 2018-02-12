/*  */

import express from 'express';
import bodyParser from 'body-parser';

import { userRouter, listRouter } from './routes/index';

import { connect } from './db-connection';
import { CONFIG } from './utils/config';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('secret', CONFIG.SECRET);

connect()
  .then(() => {
    console.log('Database connected.');
  })
  .catch(err => console.log(err));

// NOTE: Middleware to be developed
// Once logged in, check for token like:
// token = req.body.token || req.query.token || req.headers['x-access-token'];
// verify token like:
// jwt.verify(token, app.get('secret'), (err, decoded) => {
//   if (err) return res.json({ success: false, message: 'Authentication failed.' });
//   req.decoded = decoded;
//   next();
// });

app.use('/user', userRouter);
app.use('/list', listRouter);

app.listen(CONFIG.PORT, () => {
  console.log('listening on port 3000');
});
