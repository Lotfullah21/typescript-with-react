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
