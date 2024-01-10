import { call, put, takeLatest } from 'redux-saga/effects';
import API_END_POINTS from '../../integration/integration';
import getApiData from '../fetcher';
import * as types from '../constants';


// worker saga for items
function* fetchBranches({ payload : { startTime, endTime }}) {
 try {
  const branches = yield call(getApiData, API_END_POINTS.fetctTopBranches(startTime,endTime));
  yield put({ type: types.GET_BRANCHES_SUCCESS, branches: branches.data });
 } catch (error) {
  yield put({ type: types.GET_BRANCHES_FAILED, message: error.message });
 }
}

// watcher saga for items
function* branchSaga() {
 yield takeLatest(types.GET_BRANCHES_REQUESTED, fetchBranches)
}

export default branchSaga;
