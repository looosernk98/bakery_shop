import * as types from "../constants";

export function getItems(items) {
  return {
    type: types.GET_ITEMS_REQUESTED,
    payload: items,
  }
}