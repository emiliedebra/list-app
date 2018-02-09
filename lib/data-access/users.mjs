/*  */

import { UserModel } from '../models/user';

export default class TUser {
  static getUsers() {
    return UserModel.find()
      .then(result => result)
      .catch(err => err);
  }

  static addUser(user) { // need to change mixed to userObject
    return UserModel.create(user)
      .then(result => result)
      .catch(err => err);
  }
}
