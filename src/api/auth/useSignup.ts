import { useMutation } from "@tanstack/react-query";

import { signup } from "./authApi";
import { useAuthStore } from "@/stores";

export function useSignup() {
	const setTokens = useAuthStore((state) => state.setTokens);

	return useMutation({
		mutationFn: signup,

		onSuccess: (data) => {
			setTokens(data.accessToken, data.refreshToken);
		},
		onError: (error) => {
			console.error(error);
		},
	});
}
