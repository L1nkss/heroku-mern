import { combineReducers } from "@reduxjs/toolkit";

import genres from "./genre/reducer";
import user from "./user/reducer";
import films from "./films/reducer";

const rootReducer = combineReducers({
  genres,
  user,
  films,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
