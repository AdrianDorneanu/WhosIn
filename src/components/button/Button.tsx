import { spacing, typography } from "@/theme";
import { ReactNode } from "react";
import { Pressable, StyleSheet, Text } from "react-native";

import { getPreset } from "./utils";
import { ButtonPreset, ButtonVariant } from "@/components/button/types";

interface ButtonProps {
	title: string;
	onPress: () => void;
	preset?: ButtonPreset;
	variant?: ButtonVariant;
	disabled?: boolean;
	icon?: ReactNode;
}

export function Button({ title, onPress, preset = "primary", variant = "solid", disabled = false, icon }: ButtonProps) {
	const presetStyles = getPreset(preset, variant);

	return (
		<Pressable
			accessibilityRole="button"
			style={({ pressed }) => [
				styles.button,
				presetStyles.button,
				pressed && presetStyles.pressedButton,
				disabled && styles.disabled,
			]}
			onPress={onPress}
			disabled={disabled}
		>
			{icon}
			<Text style={[styles.text, presetStyles.text]}>{title}</Text>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	button: {
		alignItems: "center",
		flexDirection: "row",
		gap: spacing[3],
		borderRadius: spacing[2],
		justifyContent: "center",
		minHeight: spacing[12],
		paddingHorizontal: spacing[4],
		width: "100%",
	},
	text: {
		flexShrink: 1,
		textAlign: "center",
		...typography.button,
	},
	disabled: {
		opacity: 0.5,
	},
});
