import { useQuery } from "@tanstack/react-query";

import { getMe } from "./authApi";

export function useMe() {
	return useQuery({
		queryKey: ["auth", "me"],
		queryFn: getMe,
	});
}
