import { useState } from "react";

type navLinks = {
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
