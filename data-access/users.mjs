/* @flow */

import { getConnection } from '../db-connection';

import type { TUser } from '../utils/types';

export default class User {
  // static to avoid 'this' error
  static getUsers(): Promise<*> {
    return getConnection()
      .then(db =>
        new Promise((resolve, reject) => {
          db
            .collection('users')
            .find()
            .toArray((err: Error, results) => {
              if (err) {
                return reject(err);
              }
              return resolve(results);
            });
        }))
      .catch(err => console.log(err));
  }

  static addUser(user: TUser): Promise<*> { // need to change mixed to userObject
    return getConnection()
      .then(db =>
        new Promise((resolve, reject) => {
          db
            .collection('users')
            .save(user, (err: Error, results) => {
              if (err) {
                return reject(err);
              }
              return resolve(results);
            });
        }))
      .catch(err => console.log(err));
  }
}
