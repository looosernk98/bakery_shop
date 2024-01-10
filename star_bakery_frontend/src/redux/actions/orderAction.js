import * as types from "../constants";

export function getOrders(orders) {
  return {
    type: types.GET_ORDERS_REQUESTED,
    payload: orders,
  }
}

export const getOrdersByTimePeriod = (payload) => {
  return{
    type: types.GET_ORDERS_BY_TIME_PERIOID_REQUESTED,
    payload,
  }
}