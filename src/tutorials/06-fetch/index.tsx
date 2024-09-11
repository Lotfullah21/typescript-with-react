import { retry } from "@reduxjs/toolkit/query";
import { fetchTours } from "./types";
import { useQuery } from "@tanstack/react-query";

function Components() {
	const {
		isPending,
		isLoading,
		isError,
		error,
		data: tours,
	} = useQuery({
		queryKey: ["tours"],
		queryFn: fetchTours,
	});

	if (isPending) return <h1>Loading ...</h1>;
	if (isLoading) return <h1>Loading ...</h1>;
	if (isError) return <h1>Error: {error.message}</h1>;
	return (
		<div>
			<h2 className="mb-1">
				{tours.map((tour) => {
					const { name } = tour;
					return <h2>{name}</h2>;
				})}
			</h2>
		</div>
	);
}

export default Components;
