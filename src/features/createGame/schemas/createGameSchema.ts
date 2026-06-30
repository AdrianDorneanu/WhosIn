import { DateTime } from "luxon";
import { z } from "zod";

function parseTime(value: string) {
	return DateTime.fromFormat(value, "HH:mm");
}

export const createGameSchema = z
	.object({
		sport: z.string().min(1, "Sport is required"),
		title: z.string().min(1, "Title is required"),
		date: z.string().min(1, "Date is required"),
		startTime: z.string().min(1, "Start time is required"),
		endTime: z.string().min(1, "End time is required"),
		location: z.string().min(1, "Location is required"),
		maxPlayers: z.number().min(2, "At least 2 players are required"),
		cost: z.string(),
		notes: z.string(),
	})
	.refine(
		({ endTime, startTime }) => {
			const start = parseTime(startTime);
			const end = parseTime(endTime);

			return start.isValid && end.isValid && end > start;
		},
		{
			message: "End time must be after start time",
			path: ["endTime"],
		},
	);

export type CreateGameFormValues = z.infer<typeof createGameSchema>;
