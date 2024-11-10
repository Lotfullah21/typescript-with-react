## redux toolkit

## Redux toolkit

```ts
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "./store";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

```ts
import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "./tutorials/07-redux-toolkit/counterSlice";

export const store = configureStore({
	reducer: {
		countSlice: counterReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

useDispatch, useSelector: Hooks provided by React-Redux for dispatching actions and selecting data from the Redux store.
TypedUseSelectorHook: A type from React-Redux that ensures the useSelector hook is strongly typed.
RootState, AppDispatch: Custom types that define the shape of the Redux store state and the dispatch function.
configureStore: A function from Redux Toolkit that simplifies the creation of the Redux store.

useAppDispatch: A custom hook that wraps the useDispatch hook. It uses the AppDispatch type, ensuring that the dispatch function is typed correctly.
Benefit: This provides type safety for dispatched actions.
useAppSelector: A custom hook that wraps the useSelector hook. It uses the RootState type to ensure that the selection from the Redux store is correctly typed.

RootState: This type represents the shape of the entire Redux store's state. ReturnType<typeof store.getState> dynamically infers the state structure based on the configured reducers.
AppDispatch: This type represents the dispatch function type for the Redux store. It allows you to enforce type safety for dispatching actions throughout the app.
