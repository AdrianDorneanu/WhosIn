import { apiClient } from "@/api/apiClient";
import { AuthResponse, LoginRequest, SignupRequest, SignupResponse } from "@/api/auth/auth.types";

export function login(payload: LoginRequest): Promise<AuthResponse> {
	return apiClient<AuthResponse>("/auth/login", {
		method: "POST",
		body: JSON.stringify(payload),
		skipAuth: true,
	});
}

export function signup(payload: SignupRequest): Promise<AuthResponse> {
	return apiClient<AuthResponse>("/auth/signup", {
		method: "POST",
		body: JSON.stringify(payload),
		skipAuth: true,
	});
}

export function getMe(): Promise<SignupResponse> {
	return apiClient<SignupResponse>("/auth/me");
}
