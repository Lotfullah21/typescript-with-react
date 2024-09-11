type Advanced = {
	type: "advanced";
	name: string;
	email: string;
};
type Basic = {
	type: "basic";
	name: string;
};

const index = (props: Advanced | Basic) => {
	return (
		<div>
			{props.type === "basic" ? (
				<div className="alert-danger mb-1">
					<h3>user: {props.name}</h3>
				</div>
			) : (
				<div className="alert-success">
					<h3>user: {props.name}</h3>
					<h3>email: {props.email}</h3>
				</div>
			)}
		</div>
	);
};
export default index;
2;
