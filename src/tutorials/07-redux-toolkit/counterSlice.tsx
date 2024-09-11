import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type CounterStatus = "active" | "pending..." | "inactive";

type CounterState = {
	count: number;
	status: CounterStatus;
};
const initialState: CounterState = {
	count: 0,
	status: "pending...",
};

export const CounterSlice = createSlice({
	name: "counter",
	initialState: initialState,
	reducers: {
		increment: (state) => {
			state.count += 1;
		},
		decrement: (state) => {
			state.count -= 1;
		},
		reset: (state) => {
			state.count = 0;
		},
		setStatus: (state, action: PayloadAction<CounterStatus>) => {
			state.status = action.payload;
		},
	},
});

export const { increment, decrement, reset, setStatus } = CounterSlice.actions;
export default CounterSlice.reducer;
