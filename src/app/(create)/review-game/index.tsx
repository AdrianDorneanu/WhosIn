import { ScreenHeader } from "@/components";
import { spacing } from "@/theme";
import { StyleSheet, Text, View } from "react-native";

export default function ReviewGameRoute() {
	return (
		<View style={styles.container}>
			<ScreenHeader title="Review the game" />

			<Text>Text123</Text>
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
