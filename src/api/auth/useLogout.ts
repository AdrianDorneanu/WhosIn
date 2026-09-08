import { clearTokens } from "@/storages";
import { useAuthStore } from "@/stores";
import { queryClient } from "@/api";

export function useLogout() {
	return async function logout() {
		await clearTokens();

		useAuthStore.getState().clearAuth();

		queryClient.clear();
	};
}
