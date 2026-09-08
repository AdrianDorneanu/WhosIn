import { ScreenHeader } from "@/components";
import { AuthScreen } from "@/features";
import { spacing } from "@/theme";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";

export default function LoginRoute() {
	const params = useLocalSearchParams<{ returnTo?: string | string[] }>();
	const returnTo =
		(Array.isArray(params.returnTo) ? params.returnTo[0] : params.returnTo) === "/review-game"
			? "/review-game"
			: undefined;

	return (
		<SafeAreaView style={styles.container}>
			<ScreenHeader title="Log in" />
			<AuthScreen mode="login" returnTo={returnTo} />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: spacing[6],
	},
});
