/* @flow */

import { UserModel } from '../models/user';

export default class TUser {
  static getUsers(): Promise<*> {
    return UserModel.find()
      .then((result: Object) => result)
      .catch((err: Error) => err);
  }

  // static getUser(id: number): Promise<*> {
  //   return UserModel.findById(id)
  //     .then((result: Object) => result)
  //     .catch(err => err);
  // }
  static getUser(email: string): Promise<*> {
    return UserModel.findOne({ email })
      .then((result: Object) => {
        if (result) {
          return result;
        }
        throw new Error('User not found.');
      })
      .catch(err => err);
  }

  // TODO: add password login stuff
  static addUser(user: Object): Promise<*> { // NOTE: need to change any to userObject
    return UserModel.create(user)
      .then((result: Object) => result)
      .catch((err: Error) => err);
  }

  static updateUser(user: Object): Promise<*> {
    return UserModel.findByIdAndUpdate(user._id, user)
      .then((result: Object) => result)
      .catch((err: Error) => err);
  }

  static getUsersByListId(id: number): Promise<*> {
    return UserModel.find({ list_id: { $all: id } })
      .then((result: Object) => result)
      .catch((err: Error) => err);
  }

  static removeUser(id: number): Promise<*> {
    return UserModel.findByIdAndRemove(id)
      .then((result: Object) => result)
      .catch((err: Error) => err);
  }

  // TODO: Login
}
