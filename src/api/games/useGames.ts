import { useQuery } from "@tanstack/react-query";
import { getGames } from "@/api/games/gamesApi";

export function useGames() {
	return useQuery({
		queryFn: getGames,
		queryKey: ["games"],
	});
}
