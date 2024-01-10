import { call, put, takeLatest } from 'redux-saga/effects';
import API_END_POINTS from '../../integration/integration';
import getApiData from '../fetcher';
import * as types from '../constants';

// worker saga for orders
function* fetchOrders({ payload : { startTime, endTime }}) {
 try {
  const orders = yield call(getApiData, API_END_POINTS.fetchEachItemOrders(startTime,endTime));
  yield put({ type: types.GET_ORDERS_SUCCESS, orders: orders.data });
 } catch (error) {
  yield put({ type: types.GET_ORDERS_FAILED, message: error.message });
 }
}

function* fetchOrdersByTimePeriod({ payload : { startTime, endTime, filterType }}) {
 try {
  const orders = yield call(getApiData, API_END_POINTS.fetchOrderDataByTimePeriod(startTime,endTime,filterType));
  yield put({ type: types.GET_ORDERS_BY_TIME_PERIOID_SUCCESS, orders: orders.data });
 } catch (error) {
  yield put({ type: types.GET_ORDERS_BY_TIME_PERIOID_FAILED, message: error.message });
 }
}

// watcher saga for orders
function* orderSaga() {
 yield takeLatest(types.GET_ORDERS_REQUESTED, fetchOrders)
 yield takeLatest(types.GET_ORDERS_BY_TIME_PERIOID_REQUESTED, fetchOrdersByTimePeriod)
}

export default orderSaga;
