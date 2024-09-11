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
