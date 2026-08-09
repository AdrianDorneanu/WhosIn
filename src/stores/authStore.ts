import { create } from "zustand";

interface AuthState {
	accessToken: string | null;
	refreshToken: string | null;
	isAuthenticated: boolean;
	setTokens: (accessToken: string, refreshToken: string) => void;
	clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
	accessToken: null,
	refreshToken: null,
	isAuthenticated: false,
	setTokens: (accessToken, refreshToken) =>
		set({
			accessToken,
			refreshToken,
			isAuthenticated: true,
		}),
	clearAuth: () =>
		set({
			accessToken: null,
			refreshToken: null,
			isAuthenticated: false,
		}),
}));
