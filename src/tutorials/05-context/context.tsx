import { createContext, useContext, useState } from "react";

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(
	undefined
);

type Theme = "light" | "dark" | "system";

type ThemeProviderState = {
	theme: Theme;
	setTheme: (theme: Theme) => void;
};

type ThemeProvider = {
	children: React.ReactNode;
	defaultTheme?: Theme;
};

export function ThemeProvider({
	children,
	defaultTheme = "system",
}: ThemeProvider) {
	const [theme, setTheme] = useState<Theme>(defaultTheme);
	return (
		<ThemeProviderContext.Provider value={{ theme, setTheme }}>
			{children}
		</ThemeProviderContext.Provider>
	);
}

export const useTheme = () => {
	const context = useContext(ThemeProviderContext);
	if (context === undefined) {
		throw new Error("Use theme must be used within context");
	}
	return context;
};
