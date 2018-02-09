/* @flow */

import { UserModel } from '../models/user';

export default class TUser {
  static getUsers(): Promise<*> {
    return UserModel.find()
      .then(result => result)
      .catch(err => err);
  }

  static addUser(user: any): Promise<*> { // need to change mixed to userObject
    return UserModel.create(user)
      .then(result => result)
      .catch(err => err);
  }
}
