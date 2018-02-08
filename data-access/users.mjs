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

  static addUser(user) {
    return new Promise((resolve, reject) => {
      DB
        .connection()
        .collection('users')
        .save(user, (err, results) => {
          console.log(err);
          if (err) {
            return reject(err);
          }
          return resolve(results);
        });
    });
  }
}
