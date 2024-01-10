import { all } from "redux-saga/effects";
import itemSaga from "./itemSaga";
import orderSaga from "./orderSaga";
import branchSaga from "./branchSaga";

export default function* rootSaga() {
 yield all([itemSaga(), orderSaga(), branchSaga()]);
}