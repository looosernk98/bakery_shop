import * as types from "../constants";

const initalState = {
  ordersByItemState: [],
  loading: false,
  error: null
}

export default function itemReducer(state = initalState, action) {
  switch (action.type) {
    case types.GET_ITEMS_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case types.GET_ITEMS_SUCCESS:
      return {
        ...state,
        loading: false,
        ordersByItemState: action.items
      }
    case types.GET_ITEMS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.message
      }
    default:
      return state;
  }
}