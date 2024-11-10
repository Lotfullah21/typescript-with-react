## context

## useContext

```ts
import { createContext, useContext, useState } from "react";

const ThemeProviderContext = createContext<string | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactElement }) {
	return (
		<ThemeProviderContext.Provider value="e">
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
const Component = () => {
	return <div>JE;</div>;
};
export default Component;
```

## Fetching

```ts
import { useState, useEffect } from "react";

const url = "https://www.course-api.com/react-tours-project";

const Component = () => {
	const [tours, setTours] = useState([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isError, setIsError] = useState<string | null>();

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			try {
				const response = await fetch(url);
				if (!response.ok) {
					throw new Error(`Failed to fetch the data, ${response}`);
				}
				const rawData = await response.json();
				console.log(rawData);
				setTours(rawData);
			} catch (error) {
				const message =
					error instanceof Error ? error.message : "Some unknown error";
				setIsError(message);
			} finally {
				setIsLoading(false);
			}
		};
		fetchData();
	}, []);

	if (isLoading) {
		return <h1>Loading...</h1>;
	}
	if (isError) {
		return <h1>Error! {isError}</h1>;
	}

	return (
		<div>
			<h2>Fetching Data</h2>
			{tours.map((tour) => {
				return <h2>hello</h2>;
			})}
		</div>
	);
};
export default Component;
```

## zod library

zod, a TypeScript-first schema validation library

`z.object()`. It specifies the structure and types of the tour object fields.

The schema enforces that any object validated against it must have these properties, and all of them must be strings.
`z.infer<typeof tourSchema>` infers the shape of the tourSchema and generates a TypeScript type from it.

```ts
import { z } from "zod";

export const tourSchema = z.object({
	id: z.string(),
	name: z.string(),
	info: z.string(),
	image: z.string(),
	price: z.string(),
});

export type Tour = z.infer<typeof tourSchema>;

// When there is an array of data, we need to create another schema
const toursSchema = z.array(tourSchema);

// We can do the above directly as well.
const result = tourSchema.array().safeParse(rawData);
// Validate the data
const result = toursSchema.safeParse(rawData);
if (result.success) {
	console.log(validTour);
} else {
	console.error("Validation failed", result.error);
}
```

` safeParse()` will validate the rawData against the tourSchema. If it’s valid, result.success will be true, and you can access the validated data.

If it’s invalid, `result.success` will be false, and you'll get detailed error messages.

## React query

the combination of queryKey and useQuery ensures efficient data fetching, caching, automatic state management, and a smoother user experience by handling background refetches, cache invalidation, and error handling.

`queryFn` always returns a promise.

#### &&

The && operator in JSX is a shorthand for conditional rendering. It evaluates the expression on the left, and if it's true or a "truthy" value, the JSX on the right is rendered. If the expression on the left is false or "falsy," nothing is rendered.
