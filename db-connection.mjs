/* @flow */

import mongodb from 'mongodb';

import { CONFIG } from './utils/config';

const { MongoClient } = mongodb;

export function getConnection(): Promise<*> {
  return new Promise((resolve, reject) => {
    MongoClient.connect(CONFIG.DB_URL, (err: Error, client) => {
      if (err) return reject(err);
      const db = client.db(CONFIG.DB_NAME);
      console.log('Connected to the database.');
      return resolve({ db, client });
    });
  });
}
