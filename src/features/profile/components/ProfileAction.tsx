import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, spacing, typography } from "@/theme";

interface ProfileActionProps {
	icon?: Parameters<typeof FontAwesomeIcon>[0]["icon"];
	onPress?: () => void;
	title: string;
}

export function ProfileAction({ icon, onPress = () => undefined, title }: ProfileActionProps) {
	return (
		<Pressable
			accessibilityRole="button"
			onPress={onPress}
			style={({ pressed }) => [styles.action, pressed && styles.actionPressed]}
		>
			<View style={styles.actionContent}>
				{icon && <FontAwesomeIcon color={colors.text.secondary} icon={icon} size={16} />}

				<Text style={styles.actionLabel}>{title}</Text>
			</View>

			<Text style={styles.chevron}>›</Text>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	action: {
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "space-between",
		minHeight: spacing[12],
		paddingHorizontal: spacing[4],
	},

	actionPressed: {
		opacity: 0.65,
	},

	actionContent: {
		alignItems: "center",
		flexDirection: "row",
		gap: spacing[3],
	},

	actionLabel: {
		color: colors.text.primary,
		...typography.bodyMedium,
	},

	chevron: {
		color: colors.text.muted,
		fontSize: 24,
		lineHeight: 24,
	},
});
