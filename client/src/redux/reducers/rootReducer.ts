import { combineReducers } from "@reduxjs/toolkit";

import genres from "./genre/reducer";
import user from "./user/reducer";
import films from "./films/reducer";
import app from "./app/reduser";

const rootReducer = combineReducers({
  genres,
  user,
  films,
  app,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
