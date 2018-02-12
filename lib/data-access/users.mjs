/*  */

import { UserModel } from '../models/user';

export default class TUser {
  static getUsers() {
    return UserModel.find()
      .then((result) => result)
      .catch((err) => err);
  }

  // static getUser(id: number): Promise<*> {
  //   return UserModel.findById(id)
  //     .then((result: Object) => result)
  //     .catch(err => err);
  // }
  static getUser(email) {
    return UserModel.findOne({ email })
      .then((result) => {
        if (result) {
          return result;
        }
        throw new Error('User not found.');
      })
      .catch(err => err);
  }

  // TODO: add password login stuff
  static addUser(user) { // NOTE: need to change any to userObject
    return UserModel.create(user)
      .then((result) => result)
      .catch((err) => err);
  }

  static updateUser(user) {
    return UserModel.findByIdAndUpdate(user._id, user)
      .then((result) => result)
      .catch((err) => err);
  }

  static getUsersByListId(id) {
    return UserModel.find({ list_id: { $all: id } })
      .then((result) => result)
      .catch((err) => err);
  }

  static removeUser(id) {
    return UserModel.findByIdAndRemove(id)
      .then((result) => result)
      .catch((err) => err);
  }

  // TODO: Login
}
