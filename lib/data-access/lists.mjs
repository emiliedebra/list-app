/*  */

import { ListModel } from '../models/list';

export default class TList {
  static getLists() {
    return ListModel.find()
      .then(result => result)
      .catch(err => err);
  }

  static getList(id) {
    return ListModel.findById(id)
      .then(result => result)
      .catch(err => err);
  }

  static addList(list) {
    return ListModel.create(list)
      .then(result => result)
      .catch(err => err);
  }

  static updateList(list) {
    return ListModel.findByIdAndUpdate(list._id, list)
      .then(result => result)
      .catch(err => err);
  }

  static removeList(id) {
    return ListModel.findByIdAndRemove(id)
      .then(result => result)
      .catch(err => err);
  }
}
