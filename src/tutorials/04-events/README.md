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

``It refers to the current target and ts can infer the type which`<HTMLFormElement>`.

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
