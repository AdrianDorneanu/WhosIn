import { AuthResponse } from "@/api/auth/auth.types";
import { useAuthStore } from "@/stores";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

type ApiClientOptions = RequestInit & {
	skipAuth?: boolean;
};

export async function apiClient<T>(path: string, options: ApiClientOptions = {}): Promise<T> {
	const { skipAuth, ...requestOptions } = options;

	const accessToken = useAuthStore.getState().accessToken;

	const response = await fetch(`${API_URL}${path}`, {
		...requestOptions,
		headers: {
			"Content-Type": "application/json",

			...(!skipAuth && accessToken
				? {
						Authorization: `Bearer ${accessToken}`,
					}
				: {}),

			...requestOptions.headers,
		},
	});

	if (response.status === 401 && !skipAuth) {
		return refreshAndRetry<T>(path, requestOptions);
	}

	if (!response.ok) {
		throw new Error(`API error: ${response.status}`);
	}

	return await response.json();
}

async function refreshAndRetry<T>(path: string, options: RequestInit): Promise<T> {
	const { refreshToken, setTokens, clearAuth } = useAuthStore.getState();

	if (!refreshToken) {
		clearAuth();

		throw new Error("Session expired");
	}

	const response = await fetch(`${API_URL}/auth/refresh`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			refreshToken,
		}),
	});

	if (!response.ok) {
		clearAuth();

		throw new Error("Session expired");
	}

	const tokens: AuthResponse = await response.json();

	setTokens(tokens.accessToken, tokens.refreshToken);

	return apiClient<T>(path, options);
}
