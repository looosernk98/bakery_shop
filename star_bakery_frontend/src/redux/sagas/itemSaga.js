import { call, put,takeLatest } from 'redux-saga/effects';
import API_END_POINTS from '../../integration/integration';
import getApiData from '../fetcher';
import * as types from '../constants';



// worker saga for items
function* fetchItems({ payload : { startTime, endTime }}) {
 try {
  const items = yield call(getApiData, API_END_POINTS.fetchOrderByDeliveryState(startTime,endTime));
  yield put({ type: types.GET_ITEMS_SUCCESS, items: items.data });
 } catch (error) {
  yield put({ type: types.GET_ITEMS_FAILED, message: error.message });
 }
}

// watcher saga for items
function* itemSaga() {
  yield takeLatest(types.GET_ITEMS_REQUESTED, fetchItems);
}

export default itemSaga;
