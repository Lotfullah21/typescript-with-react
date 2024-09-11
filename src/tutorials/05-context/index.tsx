import { useContext } from "react";
import { useTheme, ThemeProvider } from "./context";

const ParentComponent = () => {
	return (
		<ThemeProvider>
			<Component></Component>
		</ThemeProvider>
	);
};

const Component = () => {
	const context = useTheme();
	console.log(context);
	return (
		<div>
			<h2>CONTEXT HOOK</h2>
			<button
				className="btn btn-center"
				onClick={() => {
					if (context.theme === "dark") {
						context.setTheme("system");
						return;
					}
					context.setTheme("dark");
				}}>
				toggle theme
			</button>
		</div>
	);
};
export default ParentComponent;
