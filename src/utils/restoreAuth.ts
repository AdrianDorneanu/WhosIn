import { useAuthStore } from "@/stores/authStore";
import { getTokens } from "@/storages";

export async function restoreAuth(): Promise<void> {
	const { accessToken, refreshToken } = await getTokens();

	if (accessToken && refreshToken) {
		useAuthStore.getState().setTokens(accessToken, refreshToken);
	}

	useAuthStore.getState().setHydrated(true);
}
