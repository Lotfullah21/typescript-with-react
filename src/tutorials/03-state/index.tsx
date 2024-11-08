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

			<ul>
				{links.map((link) => {
					return <li key={link.id}>{link.text}</li>;
				})}
			</ul>
		</div>
	);
};
export default FirstComponent;
