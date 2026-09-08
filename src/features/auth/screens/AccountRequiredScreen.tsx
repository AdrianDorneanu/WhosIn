import { AccountRequired } from "../components";
import { router } from "expo-router";

export function AccountRequiredScreen() {
	return (
		<AccountRequired
			onLogin={() =>
				router.push({
					pathname: "/login",
					params: { returnTo: "/review-game" },
				})
			}
			onSignUp={() =>
				router.push({
					pathname: "/signup",
					params: { returnTo: "/review-game" },
				})
			}
		/>
	);
}
