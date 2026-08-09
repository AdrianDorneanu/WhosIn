export type GameStatus = "UPCOMING" | "COMPLETED" | "CANCELLED";

export interface GameResponse {
	publicId: string;
	organizerId: string;
	organizerName: string;
	title: string;
	sport: string;
	startsAt: string;
	endsAt: string;
	location: string;
	maxPlayers: number;
	status: GameStatus;
	cancelledAt: string | null;
	costPerPlayer: number | null;
	notes: string | null;
	createdAt: string;
	updatedAt: string;
}

export interface CreateGameRequest {
	title: string;
	sport: string;
	startsAt: string;
	endsAt: string;
	location: string;
	maxPlayers: number;
	costPerPlayer?: number | null;
	notes?: string | null;
}
