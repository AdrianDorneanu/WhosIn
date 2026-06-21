import { colors, spacing, typography } from "@/theme";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface ScreenHeaderProps {
	title: string;
}

export function ScreenHeader({ title }: ScreenHeaderProps) {
	function handleBack() {
		if (router.canGoBack()) {
			router.back();

			return;
		}

		router.replace("/");
	}

	return (
		<View style={styles.container}>
			<Pressable
				accessibilityLabel="Go back"
				accessibilityRole="button"
				hitSlop={spacing[3]}
				onPress={handleBack}
				style={styles.backButton}
			>
				<FontAwesomeIcon color={colors.text.primary} icon={faChevronLeft} size={16} />
			</Pressable>

			<Text numberOfLines={1} style={styles.title}>
				{title}
			</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		justifyContent: "center",
		minHeight: spacing[10],
		width: "100%",
	},
	backButton: {
		alignItems: "flex-start",
		height: spacing[10],
		justifyContent: "center",
		left: 0,
		position: "absolute",
	},
	title: {
		color: colors.text.primary,
		textAlign: "center",
		...typography.button,
	},
});
