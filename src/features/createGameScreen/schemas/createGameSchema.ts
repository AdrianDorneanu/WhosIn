import { z } from "zod";

export const createGameSchema = z.object({
	sport: z.string().min(1, "Sport is required"),
	title: z.string().min(1, "Title is required"),
	date: z.string().min(1, "Date is required"),
	time: z.string().min(1, "Time is required"),
	location: z.string().min(1, "Location is required"),
	maxPlayers: z.number().min(2, "At least 2 players are required"),
	cost: z.string(),
	notes: z.string(),
});

export type CreateGameFormValues = z.infer<typeof createGameSchema>;
