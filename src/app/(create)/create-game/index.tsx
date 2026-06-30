import { ScreenHeader } from "@/components";
import { CreateGameScreen } from "@/features";
import { spacing } from "@/theme";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CreateGameRoute() {
	return (
		<SafeAreaView style={styles.container}>
			<ScreenHeader title="Create a game" />

			<CreateGameScreen />
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
