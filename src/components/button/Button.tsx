import { spacing, typography } from "@/theme";
import { Pressable, StyleSheet, Text } from "react-native";

import { getPreset } from "./utils";
import { ButtonPreset, ButtonVariant } from "@/components/button/types";

interface ButtonProps {
	title: string;
	onPress: () => void;
	preset?: ButtonPreset;
	variant?: ButtonVariant;
	disabled?: boolean;
}

export function Button({ title, onPress, preset = "primary", variant = "solid", disabled = false }: ButtonProps) {
	const presetStyles = getPreset(preset, variant);

	return (
		<Pressable
			style={({ pressed }) => [
				styles.button,
				presetStyles.button,
				pressed && presetStyles.pressedButton,
				disabled && styles.disabled,
			]}
			onPress={onPress}
			disabled={disabled}
		>
			<Text style={[styles.text, presetStyles.text]}>{title}</Text>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	button: {
		alignItems: "center",
		borderRadius: spacing[2],
		justifyContent: "center",
		minHeight: spacing[12],
		paddingHorizontal: spacing[4],
		width: "100%",
	},
	text: {
		textAlign: "center",
		...typography.button,
	},
	disabled: {
		opacity: 0.5,
	},
});
