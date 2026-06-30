import { spacing } from "@/theme";
import { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function ScreenLayout({ children }: PropsWithChildren) {
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.content}>{children}</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		flex: 1,
		justifyContent: "center",
	},
	content: {
		flex: 1,
		paddingHorizontal: spacing[6],
		width: "100%",
	},
});
