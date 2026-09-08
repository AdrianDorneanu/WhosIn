import { ApiError } from "@/api/apiClient";
import { getMe } from "@/api/auth/authApi";
import { useAuthStore } from "@/stores/authStore";
import { clearTokens, getTokens } from "@/storages";

export async function restoreAuth(): Promise<void> {
	const authStore = useAuthStore.getState();

	try {
		const { accessToken, refreshToken } = await getTokens();

		if (!accessToken || !refreshToken) {
			return;
		}

		authStore.setTokens(accessToken, refreshToken);
		await getMe();
	} catch (error) {
		authStore.clearAuth();

		if (error instanceof ApiError && [401, 403, 404].includes(error.status)) {
			await clearTokens();
		}
	} finally {
		authStore.setHydrated(true);
	}
}
