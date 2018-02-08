/*  */

import DB from '../db-connection';


export default class User {
  // static to avoid 'this' error
  static getUsers() {
    return new Promise((resolve, reject) => {
      DB
        .connection()
        .collection('users')
        .find()
        .toArray((err, results) => {
          if (err) {
            return reject(err);
          }
          return resolve(results);
        });
    });
  }

  static addUser(user) { // need to change mixed to userObject
    return new Promise((resolve, reject) => {
      DB
        .connection()
        .collection('users')
        .save(user, (err, results) => {
          if (err) {
            return reject(err);
          }
          return resolve(results);
        });
    });
  }
}
