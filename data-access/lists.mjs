/* @flow */

import { ListModel } from '../models/list';

export default class TList {
  static getLists(): Promise<*> {
    return ListModel.find()
      .then(result => result)
      .catch(err => err);
  }

  static getList(id: number): Promise<*> {
    return ListModel.findById(id)
      .then(result => result)
      .catch(err => err);
  }

  static addList(list: any): Promise<*> {
    return ListModel.create(list)
      .then(result => result)
      .catch(err => err);
  }

  static updateList(list: any): Promise<*> {
    return ListModel.findByIdAndUpdate(list._id, list)
      .then(result => result)
      .catch(err => err);
  }

  static removeList(id: number): Promise<*> {
    return ListModel.findByIdAndRemove(id)
      .then(result => result)
      .catch(err => err);
  }
}
