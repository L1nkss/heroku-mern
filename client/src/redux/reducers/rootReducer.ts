import { combineReducers } from "@reduxjs/toolkit";

import genres from "./genre/reducer";

const rootReducer = combineReducers({
  genres,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
