import { ScreenHeader } from "@/components";
import { AuthScreen } from "@/features";
import { spacing } from "@/theme";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginRoute() {
	return (
		<SafeAreaView style={styles.container}>
			<ScreenHeader title="Log in" />
			<AuthScreen mode="login" />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: spacing[6],
	},
});
