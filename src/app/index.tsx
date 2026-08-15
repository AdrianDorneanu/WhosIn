import { ScreenLayout } from "@/components";
import { WelcomeScreen } from "@/features";
import { useAuthStore } from "@/stores";
import { Redirect } from "expo-router";

export default function IndexRoute() {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

	if (isAuthenticated) {
		return <Redirect href="/home" />;
	}

	return (
		<ScreenLayout>
			<WelcomeScreen />
		</ScreenLayout>
	);
}
