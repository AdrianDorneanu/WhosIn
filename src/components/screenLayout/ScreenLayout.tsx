import { spacing } from "@/theme";
import { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView, SafeAreaViewProps } from "react-native-safe-area-context";

interface ScreenLayoutProps extends PropsWithChildren {
	edges?: SafeAreaViewProps["edges"];
}

export function ScreenLayout({ children, edges }: ScreenLayoutProps) {
	return (
		<SafeAreaView edges={edges} style={styles.container}>
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
