/*  */

import { getConnection } from '../db-connection';


export default class User {
  // static to avoid 'this' error
  static getUsers() {
    return getConnection()
      .then(db =>
        new Promise((resolve, reject) => {
          db
            .collection('users')
            .find()
            .toArray((err, results) => {
              if (err) {
                return reject(err);
              }
              return resolve(results);
            });
        }))
      .catch(err => console.log(err));
  }

  static addUser(user) { // need to change mixed to userObject
    return getConnection()
      .then(db =>
        new Promise((resolve, reject) => {
          db
            .collection('users')
            .save(user, (err, results) => {
              if (err) {
                return reject(err);
              }
              return resolve(results);
            });
        }))
      .catch(err => console.log(err));
  }
}
