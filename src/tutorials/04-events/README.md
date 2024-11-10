# Events

### 1. ChangeEvent

When we pass events in inline html, TS can infer the type and the information it needs, but when adding external functions, we need to write what kind of events and which kind of elements we are referring to inside the function.

- Inline

```ts
onChange={(e) => setText(e.target.value)}></input>
```

- External

```ts
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
	console.log(e.target.value);
	setEmail(e.target.value);
};
```

### 2. SubmitEvent

```ts
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
	e.preventDefault();
	const formData = new FormData(e.currentTarget);
};
```

`#### currentTarget`: It refers to the current target and TS can infer the type which is `<HTMLFormElement>`.

`#### target`: If we use target, we need to specify the type of the target, we can assert the type.

```ts
const formData = new FormData(e.target as HTMLFormElement);
```

`e.preventDefault()` It stops the form from a full page reload which is the default behavior of forms.

1. #### Form Data Extraction:

`new FormData(e.target)` creates a FormData instance from the form.

`FormData` captures all the form data fields.

`Object.fromEntries(formData)` is used to convert FormData instance into plain javascript object.
the form's fields names are the keys and values are the input values.

```ts
import React, { useState } from "react";
function Component() {
	const [text, setText] = useState("");
	const [email, setEmail] = useState("");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// create a new FormData instance from the form
		const formData = new FormData(e.currentTarget);
		// convert the form FormData instance into plain javascript object
		const data = Object.fromEntries(formData);
		const text = formData.get("text") as string;
		console.log(text);
		console.log("form data instance", formData);
		console.log("data", data);
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<input
					type="text"
					name="text"
					value={text}
					placeholder="text"
					onChange={(e) => setText(e.target.value)}
				/>
			</div>

			<div>
				<input
					type="email"
					name="email"
					value={email}
					placeholder="email"
					onChange={handleChange}
				/>
			</div>
			<button>submit</button>
		</form>
	);
}

export default Component;
```

## Challenge

### Destructuring props

## Parent Component:

```tsx
import Component from "./tutorials/04-events/first";
function App() {
	return (
		<main>
			<Component name="ahmad" type="basic"></Component>
			<Component
				name="ahmad"
				email="king@gmail.com"
				type="advanced"></Component>
		</main>
	);
}

export default App;
```

#### First Option

when destructuring props from parent, add a place holder name and its type annotation next to it.

```ts
// child component
const FirstComponent = (props: {
	name: string;
	email: string;
	type: string;
}) => {
	return <div>FirstComponent</div>;
};
export default FirstComponent;
```

Or

```ts
type compType = {
	name: string;
	email: string;
	type: string;
};

const FirstComponent = (props: compType) => {
	return (
		<div>
			<h1>{props.name}</h1>
			<h2>{props.email}</h2>
		</div>
	);
};
export default FirstComponent;
```

#### Second Option

### Directly destructuring

add all the props which are expected beside its type annotation.

##### Crucial

WE CANNOT add the optional `?` sign when destructuring object.

```ts
// correct
const First = ({
	name,
	email,
	type,
}: {
	name: string;
	email?: string;
	type: string;
})
```

```ts
// wrong
const First = ({
	name,
	email?,
	type,
}: {
	name: string;
	email: string;
	type: string;
})
```

### Complete

```tsx
const First = ({
	name,
	email,
	type,
}: {
	name: string;
	email?: string;
	type: string;
}) => {
	return (
		<div>
			<h1>{name}</h1>
			<h2>{email}</h2>
			<h3>{type}</h3>
		</div>
	);
};
export default First;
```

```tsx
const First = ({
	name,
	email,
	type,
}: {
	name: string;
	email?: string;
	type: string;
}) => {
	return (
		<>
			{type === "basic" ? (
				<h1>{name}</h1>
			) : (
				<div>
					<h2>{name}</h2> <p>{email}</p>
				</div>
			)}
		</>
	);
};
export default First;
```

## Crucial

When using conditional rendering, we need to wrap entire `JSX` element around `<></>` and `()`, because we are rendering two different structure based on a condition.

```tsx
// wrong
return (

			{type === "basic" ? (
				<h1>{name}</h1>
			) : (
				<div>
					<h2>{name}</h2> <p>{email}</p>
				</div>
			)}

	);
};
```

```tsx
// correct
return (

			{type === "basic" ? (
				<h1>{name}</h1>
			) : (
				<div>
					<h2>{name}</h2> <p>{email}</p>
				</div>
			)}

	);
};
```
