import { AccountRequired } from "../components";
import { router } from "expo-router";

export function AccountRequiredScreen() {
	return (
		<AccountRequired
			onLogin={() => router.push("/login")}
			onSignUp={() => router.push("/signup")}
		/>
	);
}
