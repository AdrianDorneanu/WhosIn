import { apiClient } from "@/api/apiClient";
import { CreateGameRequest, GameResponse } from "@/api/games/games.types";

export async function createGame(payload: CreateGameRequest): Promise<GameResponse> {
	return apiClient("/games", {
		method: "POST",
		body: JSON.stringify(payload),
	});
}

export async function getGames(): Promise<GameResponse[]> {
	return apiClient("/games");
}
