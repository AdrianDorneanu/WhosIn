import { ScreenHeader } from "@/components";
import { spacing } from "@/theme";
import { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface AuthLayoutProps extends PropsWithChildren {
	title: string;
}

export function AuthLayout({ children, title }: AuthLayoutProps) {
	return (
		<SafeAreaView style={styles.container}>
			<ScreenHeader title={title} />
			<View style={styles.content}>{children}</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: spacing[6],
	},
	content: {
		flex: 1,
	},
});
