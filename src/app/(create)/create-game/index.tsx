import { ScreenHeader } from "@/components";
import { CreateGameScreen } from "@/features";
import { spacing } from "@/theme";
import { StyleSheet, View } from "react-native";

export default function CreateGameRoute() {
	return (
		<View style={styles.container}>
			<ScreenHeader title="Create a game" />

			<CreateGameScreen />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: spacing[6],
		minHeight: 0,
	},
});
