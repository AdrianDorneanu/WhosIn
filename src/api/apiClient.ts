import { AuthResponse } from "@/api/auth/auth.types";
import { useAuthStore } from "@/stores";
import { clearTokens, saveTokens } from "@/storages";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

interface ApiErrorResponse {
	status: number;
	error: string;
	message: string;
	path: string;
	timestamp: string;
	validationErrors?: Record<string, string> | null;
}

export class ApiError extends Error {
	constructor(
		message: string,
		readonly status: number,
	) {
		super(message);
		this.name = "ApiError";
	}
}

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
		const errorData: ApiErrorResponse = await response.json();

		throw new ApiError(errorData.message || `API error: ${response.status}`, response.status);
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
		await clearTokens();

		clearAuth();

		throw new Error("Session expired");
	}

	const tokens: AuthResponse = await response.json();

	await saveTokens(tokens.accessToken, tokens.refreshToken);

	setTokens(tokens.accessToken, tokens.refreshToken);

	return apiClient<T>(path, options);
}
