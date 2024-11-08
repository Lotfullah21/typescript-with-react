## Return type

By default, TS can infer the type of component we are returning.

```tsx
const FirstComponent = (): JSX.Element | null | string => {
	return (
		<div>
			<h1>First Component</h1>
		</div>
	);
};
export default FirstComponent;
```

Now, here we are explicitly, inferring that the return type can be `string or null or a JSX ELement`. Usually, we do not add the return type and we let the TS to infer the type when the application grows bigger and bigger.

```tsx
const FirstComponent = (){
	return (
		<div>
			<h1>First Component</h1>
		</div>
	);
};
export default FirstComponent;
```

In the above snippet, TS infer the type automatically based on the return type inside the component.
