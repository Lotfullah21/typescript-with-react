# React + TypeScript + Vite

```sh
 npm create vite@latest react-typescript -- --template react-ts

```

### Packages

```sh
npm i zod axios react react-dom react-redux @tanstack/react-query @reduxjs/toolkit
```

## Props

```tsx
App.tsx;
import Component from "./tutorials/02-props";

function App() {
	return (
		<main>
			<Component name="ahmad" age={26}></Component>
		</main>
	);
}

export default App;
```

```tsx
index.tsx;
const FirstComponent = ({ name, age }: { name: string; age: number }) => {
	return (
		<div>
			<h2>Props</h2>
			<h2>Name: {name}</h2>
			<h2>age: {age}</h2>
		</div>
	);
};
export default FirstComponent;
```

If we are having a long list of props, for their types, we can use interface or define a type.

```tsx
type Component = { name: string; age: number };
const FirstComponent = ({ name, age }: Component) => {
	return (
		<div>
			<h2>Props</h2>
			<h2>Name: {name}</h2>
			<h2>age: {age}</h2>
		</div>
	);
};
export default FirstComponent;
```

Or we can use props instead of destructuring

```tsx
type Component = { name: string; age: number };

const FirstComponent = (props: Component) => {
	return (
		<div>
			<h2>Props</h2>
			<h2>Name: {props.name}</h2>
			<h2>age: {props.age}</h2>
		</div>
	);
};
export default FirstComponent;
```

#### Children prop

If we have a children between our components, we can mention their type as

```tsx
children: React.ReactNode;
```

## State

Typescript is smart to know the type of the value and we do not need to explicitly write the type. it can infer from the initial value.
If we pass a different type value rather than the initial one, typescript will complain.

```tsx
import { useState } from "react";
const FirstComponent = () => {
	const [count, setCount] = useState(1);
	return (
		<div>
			<h2 className="mb-1">React and typescript</h2>
			<button className="btn btn-center" onClick={() => setCount(count + 1)}>
				{count}
			</button>
		</div>
	);
};
export default FirstComponent;
```

For an empty string, we can use a generic type.

We are telling it will be an empty array with type=string.

```tsx
const [list, setList] = useState<string[]>([]);
```

Final example

```ts
import { useState } from "react";

type Link = {
	id: number;
	link: string;
	text: string;
};

const navLinks = [
	{
		id: 1,
		link: "#home",
		text: "home",
	},
	{
		id: 1,
		link: "#courses",
		text: "courses",
	},
	{
		id: 1,
		link: "#home",
		text: "about",
	},
	{
		id: 1,
		link: "#home",
		text: "contact",
	},
];

const FirstComponent = () => {
	const [count, setCount] = useState(1);
	const [list, setList] = useState<string[]>([]);
	const [links, setNavLinks] = useState(navLinks);
	return (
		<div>
			<h2 className="mb-1">React and typescript</h2>
			<button
				className="btn btn-center"
				onClick={() => {
					setCount(count + 1);
					setNavLinks([...links, { id: 1, link: "x", text: "d" }]);
				}}>
				{count}
			</button>
		</div>
	);
};
export default FirstComponent;
```

`setNavLinks([...links, { id: 1, link: "x", text: "d" }]);`, in this snippet if we miss even one of the links, typescript is going to complain.
Even though, the language itself can infer the type, but is would be better to set one.

```ts
// Here, we are telling that the shape we are expecting of type Link.
const [links, setNavLinks] = useState<Link[]>(navLinks);
```

## Events

#### 1. ChangeEvent

When we are passing event in inline html, ts can infer the type and information it needs, but when adding external functions, we need to write what kind of events and which kind of elements we are inferring to.

Inline

```ts
					onChange={(e) => setText(e.target.value)}></input>
```

External

```ts
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
	console.log(e.target.value);
	setEmail(e.target.value);
};
```

#### 2. SubmitEvent

###### currentTarget:

It refers to the current target and ts can infer the type which `<HTMLFormElement>`.

```ts
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
	e.preventDefault();
	const formData = new FormData(e.currentTarget);
};
```

###### target

If we use target, we need to specify the type of the target, we can assert the type.

```ts
const formData = new FormData(e.target as HTMLFormElement);
```

`e.preventDefault()` It stops the form from a full page reload which is the default behavior of forms.

###### Form Data Extraction:

`new FormData(e.target)` is used to create a form data object from the form element(e.target).
FormData captures all the form fields and their values.

`Object.fromEntries(formData)` is used to convert form data into plain javascript object.
the form's fields names are the keys and values are the input values.

```ts
import React, { useState } from "react";

const FirstComponent = () => {
	const [text, setText] = useState("");
	const [email, setEmail] = useState("");

	type Person = {
		name: string;
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.target as HTMLFormElement);
		const data = Object.fromEntries(formData);
		// We have specify what kind of data we are expecting.
		const text = formData.get("name") as string;
		const person: Person = { name: data.name as string };
		console.log(data);
	};
	return (
		<div>
			<h2 className="mb-1">Events</h2>
			<form className="form" onSubmit={handleSubmit}>
				<input
					type="text"
					className="form-input mb-1"
					value={text}
					name="name"
					onChange={(e) => setText(e.target.value)}></input>
				<input
					type="email"
					className="form-input mb-1"
					value={email}
					onChange={handleChange}
					name="email"></input>
				<button className="btn btn-block" type="submit">
					submit
				</button>
			</form>
		</div>
	);
};
export default FirstComponent;
```

#### Challenge

```ts
import Component from "./tutorials/04-events";

function App() {
	return (
		<main>
			<Component type="basic" name="king"></Component>
			<Component
				type="advanced"
				name="emperor"
				email="emperor@gmail.com"></Component>
		</main>
	);
}

export default App;
```

```ts
type Advanced = {
	name: string;
	type: string;
	email: string;
};
type Basic = {
	name: string;
	type: string;
	email?: string;
};

const index = (props: Advanced | Basic) => {
	return (
		<div>
			{props.type === "basic" ? (
				<div className="alert-danger mb-1">
					<h1>{props.name}</h1>
				</div>
			) : (
				<div className="alert-success">
					<h1>{props.name}</h1>
					<h4>{props.email}</h4>
				</div>
			)}
		</div>
	);
};
export default index;
```

We have narrow down the type to help ts to understand there is two distinct components with different types.

By narrowing the type using props.type === "basic", TypeScript can infer that email only exists when type is "advanced".

#### &&

The && operator in JSX is a shorthand for conditional rendering. It evaluates the expression on the left, and if it's true or a "truthy" value, the JSX on the right is rendered. If the expression on the left is false or "falsy," nothing is rendered.

## useContext

```ts
import { createContext, useContext, useState } from "react";

const ThemeProviderContext = createContext<string | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactElement }) {
	return (
		<ThemeProviderContext.Provider value="e">
			{children}
		</ThemeProviderContext.Provider>
	);
}

export const useTheme = () => {
	const context = useContext(ThemeProviderContext);
	if (context === undefined) {
		throw new Error("Use theme must be used within context");
	}
	return context;
};
const Component = () => {
	return <div>JE;</div>;
};
export default Component;
```

## Fetching

```ts
import { useState, useEffect } from "react";

const url = "https://www.course-api.com/react-tours-project";

const Component = () => {
	const [tours, setTours] = useState([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isError, setIsError] = useState<string | null>();

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			try {
				const response = await fetch(url);
				if (!response.ok) {
					throw new Error(`Failed to fetch the data, ${response}`);
				}
				const rawData = await response.json();
				console.log(rawData);
				setTours(rawData);
			} catch (error) {
				const message =
					error instanceof Error ? error.message : "Some unknown error";
				setIsError(message);
			} finally {
				setIsLoading(false);
			}
		};
		fetchData();
	}, []);

	if (isLoading) {
		return <h1>Loading...</h1>;
	}
	if (isError) {
		return <h1>Error! {isError}</h1>;
	}

	return (
		<div>
			<h2>Fetching Data</h2>
			{tours.map((tour) => {
				return <h2>hello</h2>;
			})}
		</div>
	);
};
export default Component;
```

## zod library

zod, a TypeScript-first schema validation library

`z.object()`. It specifies the structure and types of the tour object fields.

The schema enforces that any object validated against it must have these properties, and all of them must be strings.
`z.infer<typeof tourSchema>` infers the shape of the tourSchema and generates a TypeScript type from it.

```ts
import { z } from "zod";

export const tourSchema = z.object({
	id: z.string(),
	name: z.string(),
	info: z.string(),
	image: z.string(),
	price: z.string(),
});

export type Tour = z.infer<typeof tourSchema>;

// When there is an array of data, we need to create another schema
const toursSchema = z.array(tourSchema);

// We can do the above directly as well.
const result = tourSchema.array().safeParse(rawData);
// Validate the data
const result = toursSchema.safeParse(rawData);
if (result.success) {
	console.log(validTour);
} else {
	console.error("Validation failed", result.error);
}
```

` safeParse()` will validate the rawData against the tourSchema. If it’s valid, result.success will be true, and you can access the validated data.

If it’s invalid, `result.success` will be false, and you'll get detailed error messages.

## React query

the combination of queryKey and useQuery ensures efficient data fetching, caching, automatic state management, and a smoother user experience by handling background refetches, cache invalidation, and error handling.

`queryFn` always returns a promise.

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
