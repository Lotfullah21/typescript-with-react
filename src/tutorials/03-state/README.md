## State

Typescript is smart to know the value type and we do not need to explicitly write the type.
It can infer from the initial value.

If we pass a value to change the state and type of the value does not match with the initial value of the state, typescript will complain.

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

Here, the initial value type is a number, if we want to change the state value with a value type other than a `number`, TS does not allow it.

```ts
<button className="btn btn-center" onClick={() => setCount(count + "hello")}>
```

### Adding the type explicitly

We are telling, it will be an empty array with type=string.

```tsx
const [list, setList] = useState<string[]>([]);
```

```tsx
import { useState } from "react";
const FirstComponent = () => {
	const [count, setCount] = useState(1);
	const [list, setList] = useState<string[]>([]);
	return (
		<div>
			<h2 className="mb-1">React and typescript</h2>
			<button className="btn btn-center" onClick={() => setCount(count + 1)}>
			<button className="btn btn-center" onClick={() => setList(["hello","library"])}>
				{count}
			</button>
		</div>
	);
};
export default FirstComponent;
```

### Example

```ts
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

type Link = {
	id: string;
	link: string;
	text: string;
};

const navLinks = [
	{
		id: uuidv4(),
		link: "#home",
		text: "home",
	},
	{
		id: uuidv4(),
		link: "#courses",
		text: "courses",
	},
	{
		id: uuidv4(),
		link: "#home",
		text: "about",
	},
];

const FirstComponent = () => {
	const [links, setNavLinks] = useState(navLinks);
	return (
		<div>
			<button
				className="btn btn-center"
				onClick={() => {
					setNavLinks([
						...links,
						{
							id: uuidv4(),
							link: uuidv4() + "link",
							text: uuidv4() + "--link",
						},
					]);
				}}>
				set link
			</button>
		</div>
	);
};
export default FirstComponent;
```

Using following snippet, we are letting TS to infer the shape of our data from the initial object which is

```tsx
const [links, setNavLinks] = useState(navLinks);
```

```json
{
	id: string;
	link: string;
	text: string;
}
```

But to be more explicit, we can add our own type.

```tsx


type Link = {
	id: string;
	link: string;
	text: string;
};

const FirstComponent = () => {
	const [links, setNavLinks] = useState<Link[]>(navLinks);
	return (
		<div>
			<button
				className="btn btn-center"
				onClick={() => {
					setNavLinks([
						...links,
						{
							id: uuidv4(),
							link: uuidv4() + "link",
							text: uuidv4() + "--link",
						},
					]);
				}}>
				set link
			</button>
			<>

		</div>
	);
};
```
