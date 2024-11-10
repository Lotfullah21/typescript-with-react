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
