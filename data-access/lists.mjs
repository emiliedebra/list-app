/* @flow */

import { ListModel } from '../models/list';

export default class TList {
  static getLists(): Promise<*> {
    return ListModel.find()
      .then((result: Object) => result)
      .catch((err: Error) => err);
  }

  static getList(id: number): Promise<*> {
    return ListModel.findById(id)
      .then((result: Object) => result)
      .catch((err: Error) => err);
  }

  static addList(list: Object): Promise<*> {
    return ListModel.create(list)
      .then((result: Object) => result)
      .catch((err: Error) => err);
  }

  // NOTE: returns the old list
  static updateList(list: Object): Promise<*> {
    return ListModel.findByIdAndUpdate(list._id, list)
      .then((result: Object) => {
        return result;
      })
      .catch((err: Error) => err);
  }

  static removeList(id: number): Promise<*> {
    return ListModel.findByIdAndRemove(id)
      .then((result: Object) => result)
      .catch((err: Error) => err);
  }

  static getCheckedItems(id: number): Promise<*> {
    return ListModel.findById(id)
      .then((result: Object) => result.checked_items)
      .catch((err: Error) => err);
  }

  static getUncheckedItems(id: number): Promise<*> {
    return ListModel.findById(id)
      .then((result: Object) => result.unchecked_items)
      .catch((err: Error) => err);
  }

  static checkItem(id: number, item: string): Promise<*> {
    return ListModel.findById(id)
      .then((result) => {
        if (result.checked_items.includes(item)) {
          return result;
        } else if (result.unchecked_items.includes(item)) {
          result.unchecked_items.splice(result.unchecked_items.indexOf(item), 1);
          result.checked_items.push(item);
          return this.updateList(result)
            .then((checkedResult: Object) => checkedResult)
            .catch((err: Error) => err);
        }
        throw new Error('Item is not in the list.');
      })
      .catch((err: Error) => err);
  }

  static uncheckItem(id: number, item: string): Promise<*> {
    return ListModel.findById(id)
      .then((result) => {
        if (result.unchecked_items.includes(item)) {
          return result;
        } else if (result.checked_items.includes(item)) {
          result.checked_items.splice(result.checked_items.indexOf(item), 1);
          result.unchecked_items.push(item);
          return this.updateList(result)
            .then((uncheckedResult: Object) => uncheckedResult)
            .catch((err: Error) => err);
        }
        throw new Error('Item is not in the list.');
      })
      .catch((err: Error) => err);
  }
}
