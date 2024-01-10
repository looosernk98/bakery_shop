import * as types from "../constants";

export function getBranches(branches) {
  return {
    type: types.GET_BRANCHES_REQUESTED,
    payload: branches,
  }
}