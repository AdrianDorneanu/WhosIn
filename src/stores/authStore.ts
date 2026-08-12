import { create } from "zustand";

interface AuthState {
	accessToken: string | null;
	refreshToken: string | null;
	isAuthenticated: boolean;
	isHydrated: boolean;
	setTokens: (accessToken: string, refreshToken: string) => void;
	clearAuth: () => void;
	setHydrated: (isHydrated: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
	accessToken: null,
	refreshToken: null,
	isAuthenticated: false,
	isHydrated: false,
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
	setHydrated: (isHydrated) =>
		set({
			isHydrated,
		}),
}));
