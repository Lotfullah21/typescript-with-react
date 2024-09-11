import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "./tutorials/07-redux-toolkit/counterSlice";

export const store = configureStore({
	reducer: {
		countSlice: counterReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
