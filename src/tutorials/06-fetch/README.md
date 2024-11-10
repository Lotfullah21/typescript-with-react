## fetching the date

We are going to fetch the data using two approaches, first one will be using `fetch` and in second approach, `useQuery` will be used to fetch the data.

### 1. using fetch

```tsx
import { useState, useEffect } from "react";
const url = "https://www.course-api.com/react-tours-project";

const FetchDataComponent = () => {
	const [tours, setTours] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			try {
				const response = await fetch(url);
				if (!response.ok) {
					throw Error(`Failed to fetch`);
				}
				const rawData: = await response.json();
				setTours(rawData);
				console.log("raw data =", rawData);
			} catch (error) {
				const message =
					error instanceof Error ? error.message : `There was an error`;
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
		return <h1>Error...{isError}</h1>;
	}

	return (
		<h1>
			{tours.map((tour) => {
				return <h1>{tour.name}</h1>;
			})}
		</h1>
	);
};
export default FetchDataComponent;
```

#### Why do we need type

```tsx
const [tours, setTours] = useState([]);
```

```tsx
return (
	<h1>
		{tours.map((tour) => {
			return <h1>{tour.name}</h1>;
		})}
	</h1>
);
```

initially, when we don't specify the types of data we are getting, TS automatically sets the type to never and when we want to access any of the properties, TS will complain and says: `Property 'name' does not exist on type 'never'`

#### What is the solution

Create a type and use that type in `const [tours, setTours] = useState([])`

#### How to create a type?

mainly, two approaches

1. directly using a `type`
2. using zod

using `zod` library, follow the two steps

- Create a schema using zod

```ts
export const tourSchema = z.object({
	name: z.sting(),
	id: z.string(),
	image: z.string(),
	info: z.string(),
});
```

- from the schema, infer the type.

```ts
export type Tour = z.infer<typeof tourSchema>;
```

Now, let's use this type.

```ts
import { useState, useEffect } from "react";
import { Tour, tourSchema } from "./utils";

const url = "https://www.course-api.com/react-tours-project";

const FetchDataComponent = () => {
	const [tours, setTours] = useState<Tour[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			try {
				const response = await fetch(url);
				if (!response.ok) {
					throw Error(`Failed to fetch`);
				}
				const rawData: Tour[] = await response.json();
				const result = tourSchema.array().safeParse(rawData);
				if (!result.success) {
					throw new Error(`Failed to parse the schema`);
				}
				setTours(result.data);
				console.log("raw data =", rawData);
			} catch (error) {
				const message =
					error instanceof Error ? error.message : `There was an error`;
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
		return <h1>Error...{isError}</h1>;
	}

	return (
		<div>
			{tours.map((tour) => {
				return (
					<div key={tour.id}>
						<p>{tour.name}</p>
						<p>{tour.price}</p>
					</div>
				);
			})}
		</div>
	);
};
export default FetchDataComponent;
```

## Crucial

If we forget to add an existed property in our data to the schema, it is not going to complain, but if we add a property that is not existed on original data, it is going to fail to parse the schema.

`const result = tourSchema.array().safeParse(rawData);` is used to parse the schema at run time.

basically, here we are saying check the `tourSchema` against `rawData` schema.

## 2. Using axis and query client

```sh
npm install axios, query-client
```

in `utils.tsx`

```tsx
// utils.tsx
import { z } from "zod";
import axios from "axios";

export const tourSchema = z.object({
	id: z.string(),
	name: z.string(),
	image: z.string(),
	info: z.string(),
	price: z.string(),
});

export type Tour = z.infer<typeof tourSchema>;

const url = "https://www.course-api.com/react-tours-project";

export const fetchData = async (): Promise<Tour[]> => {
	const response = await axios.get<Tour[]>(url);
	const result = tourSchema.array().safeParse(response.data);
	if (!result.success) {
		throw new Error(`Failed to parse the schema`);
	}
	return result.data;
};
```

in `main.tsx`

```tsx
// main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "./store.ts";
import { Provider } from "react-redux";
const queryClient = new QueryClient();
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				<App />
			</QueryClientProvider>
		</Provider>
	</StrictMode>
);
```

```tsx
// index.tsx
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "./utils";

const FetchDataComponent = () => {
	const {
		isLoading,
		isError,
		data: tours,
		error,
	} = useQuery({
		queryKey: ["tours"],
		queryFn: fetchData,
	});

	if (isLoading) {
		return <h1>Loading...</h1>;
	}
	if (isError) {
		return <h1>{error.message}</h1>;
	}

	return (
		<div>
			{tours?.map((tour) => {
				return (
					<div key={tour.id}>
						<p>{tour.name}</p>
						<p>{tour.price}</p>
					</div>
				);
			})}
		</div>
	);
};
export default FetchDataComponent;
```

Asynchronous Call with async and await:

The function fetchData is marked with the async keyword, which means it will return a promise by default.
Inside the function, we use await with axios.get<Tour[]>(url), an asynchronous operation. This returns a promise that resolves with the response from the API.
Type of fetchData:

By specifying Promise<Tour[]> as the return type of fetchData, we're saying that this function will eventually (once the asynchronous operation completes) resolve to an array of Tour objects.
Since axios.get returns a promise, fetchData itself must also return a promise.

## Purpose of useQuery

The useQuery hook is designed to fetch and cache data asynchronously, managing the process of fetching data from a remote source (like an API) while providing out-of-the-box caching, error handling, loading states, and more. This helps manage the complexity of data fetching in a React app, especially when data needs to be reused across components or pages.

### 3. How useQuery Works

Query Key: The first parameter (like 'tours' in the example above) is a unique identifier for this query. React Query uses it to cache and track the fetched data. When the same query key is used again, React Query can serve data from the cache instead of making another request.

Fetch Function: The second parameter (fetchData) is the async function responsible for fetching the data. It’s the same function we created earlier, which returns a promise of Tour[].

Query Result Object:

data: Contains the fetched data if the request is successful.
error: Contains the error object if the request fails.
isLoading: Boolean that’s true while the request is in progress.
isError: Boolean that’s true if there was an error with the request.
