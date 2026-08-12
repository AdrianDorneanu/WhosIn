import { useMutation } from "@tanstack/react-query";

import { login } from "./authApi";
import { useAuthStore } from "@/stores";
import { saveTokens } from "@/storages";

export function useLogin() {
	const setTokens = useAuthStore((state) => state.setTokens);

	return useMutation({
		mutationFn: login,

		onSuccess: async (data) => {
			await saveTokens(data.accessToken, data.refreshToken);

			setTokens(data.accessToken, data.refreshToken);
		},
	});
}
