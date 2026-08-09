import { useMutation } from "@tanstack/react-query";

import { login } from "./authApi";
import { useAuthStore } from "@/stores";

export function useLogin() {
	const setTokens = useAuthStore((state) => state.setTokens);

	return useMutation({
		mutationFn: login,

		onSuccess: (data) => {
			setTokens(data.accessToken, data.refreshToken);
		},
		onError: (error) => {
			console.error(error);
		},
	});
}
