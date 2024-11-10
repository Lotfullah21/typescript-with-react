const First = ({
	name,
	email,
	type,
}: {
	name: string;
	email?: string;
	type: string;
}) => {
	return (
		<>
			{type === "basic" ? (
				<h1>{name}</h1>
			) : (
				<div>
					<h2>{name}</h2> <p>{email}</p>
				</div>
			)}
		</>
	);
};
export default First;
