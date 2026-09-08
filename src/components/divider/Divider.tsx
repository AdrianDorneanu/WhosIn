import { colors } from "@/theme";
import { StyleSheet, View } from "react-native";

export function Divider() {
	return <View style={styles.divider} />;
}

const styles = StyleSheet.create({
	divider: {
		backgroundColor: colors.border.strong,
		height: 1,
		width: "100%",
	},
});
