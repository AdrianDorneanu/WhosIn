import { ScreenHeader } from "@/components";
import { AccountRequiredScreen } from "@/features";
import { spacing } from "@/theme";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AccountRequiredRoute() {
	return (
		<SafeAreaView style={styles.container}>
			<ScreenHeader title="Save your game" />
			<AccountRequiredScreen />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: spacing[6],
	},
});
