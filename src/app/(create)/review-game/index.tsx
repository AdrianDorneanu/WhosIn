import { ScreenHeader } from "@/components";
import { ReviewGameScreen } from "@/features";
import { spacing } from "@/theme";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ReviewGameRoute() {
	return (
		<SafeAreaView style={styles.container}>
			<ScreenHeader title="Review the game" />

			<ReviewGameScreen />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: spacing[6],
		minHeight: 0,
		paddingHorizontal: spacing[6],
	},
});
