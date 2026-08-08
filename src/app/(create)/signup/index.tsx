import { ScreenHeader } from "@/components";
import { AuthScreen } from "@/features";
import { spacing } from "@/theme";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignUpRoute() {
	return (
		<SafeAreaView style={styles.container}>
			<ScreenHeader title="Create account" />
			<AuthScreen mode="signup" />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: spacing[6],
	},
});
