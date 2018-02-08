/* @flow */

import mongoClient from 'mongodb';

import { DB_URL } from './config';

let db;
mongoClient.connect(DB_URL, (err: Error, client) => {
  if (err) return console.log(err);
  console.log('Creating database...');
  db = client.db('list-app-db');
});

export default class DB {
  static connection() {
    return db;
  }
}
