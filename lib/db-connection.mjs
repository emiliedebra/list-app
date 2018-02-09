/*  */
import mongoose from 'mongoose';

import { CONFIG } from './utils/config';

mongoose.Promise = Promise;

// connect to database
export function connect() {
  return new Promise((resolve, reject) => {
    mongoose.connect(CONFIG.DB_URL);
    mongoose.connection.once('open', () => resolve(mongoose));
    mongoose.connection.on('error', err => reject(err));
  });
}

// get collections in database
export function getCollections() {
  return new Promise((resolve, reject) => {
    if (mongoose.connection.collections) {
      return resolve(mongoose.connection.collections);
    }
    return reject(new Error('Collections don\'t exist'));
  });
}

// disconnect from database
export function disconnect() {
  return new Promise((resolve, reject) => {
    mongoose.connection.close();
    mongoose.connection.once('close', () => resolve());
    mongoose.connection.on('error', err => reject(err));
  });
}
