/* @flow */

import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import { CONFIG } from '../utils/config';
import { User } from '../data-access/index';

const userRouter = new express.Router();

// BUG: Doesn't catch no user found error
userRouter.post('/login', (req, res: express$Response) => {
  User
    .getUser(req.body.email)
    .then((user) => {
      bcrypt.compare(req.body.password, user.password)
        .then(() => {
          const payload = {
            _id: user._id,
          };
          const token = jwt.sign(payload, CONFIG.SECRET, { expiresIn: 86400 });
          res.status(200).json({ message: 'Token Generated.', token });
        })
        .catch(() => {
          throw new Error('Incorrect password.');
        });
    })
    .catch(err => res.status(400).send(err.message));
});

userRouter.get('/users', (req: express$Request, res: express$Response) => User
  .getUsers()
  .then((result: Array<string>) => {
    res.send(result);
  })
  .catch((error: Error) => console.log(error)));

userRouter.post('/add-user', (req, res: express$Response) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 8);
  User
    .addUser({ email: req.body.email, name: req.body.name, password: hashedPassword })
    .then((result: Object) => {
      result.password = 0; // projection
      res.status(200).send(result);
    })
    .catch((err: Error) => res.status(400).send(err.message));
});

export default userRouter;
