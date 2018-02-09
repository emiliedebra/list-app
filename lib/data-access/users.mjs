/*  */

import { UserModel } from '../models/user';

export default class TUser {
  static getUsers() {
    return UserModel.find()
      .then(result => result)
      .catch(err => err);
  }

  static getUser(id) {
    return UserModel.findById(id)
      .then(result => result)
      .catch(err => err);
  }

  static addUser(user) { // NOTE: need to change any to userObject
    return UserModel.create(user)
      .then(result => result)
      .catch(err => err);
  }

  static updateUser(user) {
    return UserModel.findByIdAndUpdate(user._id, user)
      .then(result => result)
      .catch(err => err);
  }

  static getUsersByListId(id) {
    return UserModel.find({ list_id: { $all: id } })
      .then(result => result)
      .catch(err => err);
  }
}
