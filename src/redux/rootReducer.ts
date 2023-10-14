import { combineReducers } from "@reduxjs/toolkit";
import UserLocationSlice from "./UserLocationSlice/UserLocationSlice";

const rootReducer = combineReducers({
  "UserLocationSlice": UserLocationSlice.reducer,
});

export default rootReducer;
