import * as types from "../constants";

const initalState = {
  branches: [],
  loading: false,
  error: null
}

export default function branchReducer(state = initalState, action) {
  switch (action.type) {
    case types.GET_BRANCHES_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case types.GET_BRANCHES_SUCCESS:
      return {
        ...state,
        loading: false,
        branches: action.branches
      }
    case types.GET_BRANCHES_FAILED:
      return {
        ...state,
        loading: false,
        error: action.message
      }
    default:
      return state;
  }
}