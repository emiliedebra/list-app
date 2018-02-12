/* @flow */
import express from 'express';

import { List } from '../data-access/index';

const listRouter = new express.Router();

// BUG: Doesn't catch no List found error
listRouter.post('/add-list', (req, res: express$Response) => {
  List
    .addList(req.body)
    .then((list) => {
      res.status(200).send(list);
    })
    .catch((error: Error) => res.status(400).send(error.message));
});

listRouter.post('/update-list', (req, res: express$Response) => {
  List
    .updateList(req.body)
    .then(() => {
      res.status(200);
    })
    .catch((error: Error) => res.status(400).send(error.message));
});

listRouter.get('/get-list', (req, res: express$Response) => {
  List
    .getList(req.body._id)
    .then((list) => {
      res.status(200).send(list);
    })
    .catch((error: Error) => res.status(400).send(error.message));
});

// TODO: return more than one list


export default listRouter;
