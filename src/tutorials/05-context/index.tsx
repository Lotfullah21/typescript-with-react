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

	return <div>Component</div>;
};

export default ParentComponent;
