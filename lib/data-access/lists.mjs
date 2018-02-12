/*  */

import { ListModel } from '../models/list';

export default class TList {
  static getLists() {
    return ListModel.find()
      .then((result) => result)
      .catch((err) => err);
  }

  static getList(id) {
    return ListModel.findById(id)
      .then((result) => result)
      .catch((err) => err);
  }

  static addList(list) {
    return ListModel.create(list)
      .then((result) => result)
      .catch((err) => err);
  }

  // NOTE: returns the old list
  static updateList(list) {
    return ListModel.findByIdAndUpdate(list._id, list)
      .then((result) => result)
      .catch((err) => err);
  }

  static removeList(id) {
    return ListModel.findByIdAndRemove(id)
      .then((result) => result)
      .catch((err) => err);
  }

  static getCheckedItems(id) {
    return ListModel.findById(id)
      .then((result) => result.checked_items)
      .catch((err) => err);
  }

  static getUncheckedItems(id) {
    return ListModel.findById(id)
      .then((result) => result.unchecked_items)
      .catch((err) => err);
  }

  static checkItem(id, item) {
    return ListModel.findById(id)
      .then((result) => {
        if (result.checked_items.includes(item)) {
          return result;
        } else if (result.unchecked_items.includes(item)) {
          result.unchecked_items.splice(result.unchecked_items.indexOf(item), 1);
          result.checked_items.push(item);
          return this.updateList(result)
            .then((checkedResult) => checkedResult)
            .catch((err) => err);
        }
        throw new Error('Item is not in the list.');
      })
      .catch((err) => err);
  }

  static uncheckItem(id, item) {
    return ListModel.findById(id)
      .then((result) => {
        if (result.unchecked_items.includes(item)) {
          return result;
        } else if (result.checked_items.includes(item)) {
          result.checked_items.splice(result.checked_items.indexOf(item), 1);
          result.unchecked_items.push(item);
          return this.updateList(result)
            .then((uncheckedResult) => uncheckedResult)
            .catch((err) => err);
        }
        throw new Error('Item is not in the list.');
      })
      .catch((err) => err);
  }
}
