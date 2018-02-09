/* @flow */

import { UserModel } from '../models/user';

export default class TUser {
  static getUsers(): Promise<*> {
    return UserModel.find()
      .then(result => result)
      .catch(err => err);
  }

  static getUser(id: number): Promise<*> {
    return UserModel.findById(id)
      .then(result => result)
      .catch(err => err);
  }

  static addUser(user: any): Promise<*> { // NOTE: need to change any to userObject
    return UserModel.create(user)
      .then(result => result)
      .catch(err => err);
  }

  static updateUser(user: any): Promise<*> {
    return UserModel.findByIdAndUpdate(user._id, user)
      .then(result => result)
      .catch(err => err);
  }

  static getUsersByListId(id: number): Promise<*> {
    return UserModel.find({ list_id: { $all: id } })
      .then(result => result)
      .catch(err => err);
  }
}
