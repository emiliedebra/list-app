import express from 'express';

const listRouter = new express.Router();

listRouter.get('/', (req, res) => {
  res.status(200).send('List Router working');
});

export default listRouter;
