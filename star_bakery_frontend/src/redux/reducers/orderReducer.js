import * as types from "../constants";

const initalState = {
  ordersByItem: [],
  loading: false,
  error: null,
  orderListByTimePeriod:[]
}

export default function orderReducer(state = initalState, action) {
  switch (action.type) {
    case types.GET_ORDERS_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case types.GET_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        ordersByItem: action.orders
      }
    case types.GET_ORDERS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.message
      }
    case types.GET_ORDERS_BY_TIME_PERIOID_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case types.GET_ORDERS_BY_TIME_PERIOID_SUCCESS:
      return {
        ...state,
        loading: false,
        orderListByTimePeriod: action.orders
      }
    case types.GET_ORDERS_BY_TIME_PERIOID_FAILED:
      return {
        ...state,
        loading: false,
        error: action.message
      }
    
    default:
      return state;
  }
}