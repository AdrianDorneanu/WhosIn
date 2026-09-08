import { useSuspenseQuery } from "@tanstack/react-query";

import { getMe } from "./authApi";

export function useMe() {
	return useSuspenseQuery({
		queryKey: ["auth", "me"],
		queryFn: getMe,
	});
}
