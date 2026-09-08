import { colors, spacing, typography } from "@/theme";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface TextLinkProps {
	prompt: string;
	label: string;
	onPress: () => void;
}

export function TextLink({ prompt, label, onPress }: TextLinkProps) {
	return (
		<View style={styles.container}>
			<Text style={styles.prompt}>{prompt}</Text>
			<Pressable
				accessibilityRole="link"
				hitSlop={spacing[2]}
				onPress={onPress}
				style={({ pressed }) => pressed && styles.pressed}
			>
				<Text style={styles.label}>{label}</Text>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		flexDirection: "row",
		gap: spacing[2],
		justifyContent: "center",
	},
	prompt: {
		color: colors.text.secondary,
		...typography.body,
	},
	label: {
		color: colors.text.link,
		...typography.bodyMedium,
	},
	pressed: {
		opacity: 0.7,
	},
});
