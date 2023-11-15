import { combineReducers } from "@reduxjs/toolkit";
import { reducer as calendarReducer } from "src/reducers/calendar-reducer";
import { reducer as mailReducer } from "src/slices/mail";

export const rootReducer = combineReducers({
  calendar: calendarReducer,
  mail: mailReducer,
});
