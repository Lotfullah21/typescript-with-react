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
