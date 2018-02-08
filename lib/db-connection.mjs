/*  */

import mongoClient from 'mongodb';

import { CONFIG } from './utils/config';

let _client;
let db;

export function getConnection() {
  return new Promise((resolve, reject) => {
    if (!db || !_client) {
      mongoClient.connect(CONFIG.DB_URL, (err, client) => {
        if (err) return reject(err);
        console.log('Connected to the database.');
        _client = client;
        db = _client.db(CONFIG.DB_NAME);
      });
    }
    return resolve(db);
  });
}

export function closeConnection() {
  if (!_client) throw new Error('No database to disconnect.');
  _client.close();
  console.log('Database disconnected');
}
