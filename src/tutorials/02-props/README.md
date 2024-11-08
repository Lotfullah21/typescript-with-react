## Props

props are properties we pass from parent component to child component.

```tsx
// App.tsx;
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

Now, the `index.tsx` is the child component and we have passed `name and age` prop in parent component (`App.tsx`).

To use the props, pass the object in child component along the type annotation.

```tsx
// 02-props/index.tsx
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

If we are having a long list of props, we can use interface or define a type.

```tsx
// 02-props/index.tsx
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

#### No destructuring

instead of destructuring the props, we can use a place holder and access the props properties using dot (`.`) notation.
But `type annotation` is mandatory.

```tsx
// 02-props/index.tsx
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

## Children prop

children props are properties that are passed in between the parent component tag.

```tsx
// App.tsx;
function App() {
	return (
		<Component name="ahmad" age={26}>
			<h2>Hello world</h2>
		</Component>
	);
}
```

the `<h2>Hello world</h2>` is children prop.

#### How to access them and what is its type?

the children type is

```tsx
{
	children: React.ReactNode;
}
```

and to access

```tsx
// 02-props/index.tsx
import React from "react";
type Component = { name: string; age: number; children?: React.ReactNode };
const FirstComponent = (props: Component) => {
	return (
		<div>
			<h2>Props</h2>
			<h2>Name: {props.name}</h2>
			<h2>age: {props.age}</h2>
			{props.children}
		</div>
	);
};
export default FirstComponent;
```

## Alternatively

We can import `PropsWithChildren` from react as well, it is a generic type that combines whatever we pass inside our type and adds `children?: React.ReactNode` to the final component type.

```tsx
import React from "react";
import { PropsWithChildren } from "react";

type Component = PropsWithChildren<{
	name: string;
	age: number;
	children?: PropsWithChildren;
}>;
```
