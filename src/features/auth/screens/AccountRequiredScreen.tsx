import { AccountRequired } from "../components";
import { useAuthStore } from "@/stores";
import { Redirect, router } from "expo-router";

export function AccountRequiredScreen() {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

	if (isAuthenticated) {
		return <Redirect href="/review-game" />;
	}

	return (
		<AccountRequired
			onLogin={() => router.push({ pathname: "/login", params: { returnTo: "/review-game" } })}
			onSignUp={() => router.push({ pathname: "/signup", params: { returnTo: "/review-game" } })}
		/>
	);
}
