import { z } from "zod";
import axios from "axios";

const url = "https://www.course-api.com/react-tours-project";

export const tourSchema = z.object({
	id: z.string(),
	name: z.string(),
	info: z.string(),
	image: z.string(),
	price: z.string(),
});

export type Tour = z.infer<typeof tourSchema>;

export const fetchTours = async (): Promise<Tour[]> => {
	const response = await axios.get<Tour[]>(url);
	const result = tourSchema.array().safeParse(response.data);
	if (!result.success) {
		throw new Error(`Wrong formatted data`);
	}
	return result.data;
};
