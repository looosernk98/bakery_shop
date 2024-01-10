import { combineReducers } from "redux";
import itemReducer from "./itemReducer";
import branchReducer from "./branchReducer";
import orderReducer from './orderReducer'

const rootReducer = combineReducers({
  itemReducer: itemReducer,
  branchReducer: branchReducer,
  orderReducer: orderReducer,
})
export default rootReducer;