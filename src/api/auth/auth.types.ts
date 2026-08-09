export type UserStatus = "ACTIVE" | "SUSPENDED";

export interface LoginRequest {
	email: string;
	password: string;
}

export interface SignupRequest {
	email: string;
	password: string;
	displayName: string;
}

export interface AuthResponse {
	accessToken: string;
	refreshToken: string;
}

export interface RefreshRequest {
	refreshToken: string;
}

export interface SignupResponse {
	id: string;
	email: string;
	displayName: string;
	status: UserStatus;
	createdAt: string;
}
