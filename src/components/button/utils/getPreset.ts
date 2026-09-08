import { colors } from "@/theme";
import { StyleSheet } from "react-native";

import { ButtonPreset, ButtonVariant } from "../types";

export function getPreset(preset: ButtonPreset, variant: ButtonVariant) {
	const presetStyles = getPresetStyles(preset);
	const variantStyles = getVariantStyles(preset, variant);

	return {
		button: [presetStyles.button, variantStyles.button],
		pressedButton: [presetStyles.pressedButton, variantStyles.pressedButton],
		text: [presetStyles.text, variantStyles.text],
	};
}

function getPresetStyles(preset: ButtonPreset) {
	switch (preset) {
		case "danger":
			return {
				button: styles.dangerButton,
				pressedButton: styles.dangerPressedButton,
				text: styles.dangerText,
			};

		case "secondary":
			return {
				button: styles.secondaryButton,
				pressedButton: styles.secondaryPressedButton,
				text: styles.secondaryText,
			};

		case "primary":
		default:
			return {
				button: styles.primaryButton,
				pressedButton: styles.primaryPressedButton,
				text: styles.primaryText,
			};
	}
}

function getVariantStyles(preset: ButtonPreset, variant: ButtonVariant) {
	switch (variant) {
		case "outline":
			return {
				button: [
					styles.outlineButton,
					{
						borderColor: getColor(preset),
					},
				],
				pressedButton: styles.outlinePressedButton,
				text: {
					color: getColor(preset),
				},
			};
		case "ghost":
			return {
				button: styles.ghostButton,
				pressedButton: styles.ghostPressedButton,
				text: {
					color: getColor(preset),
				},
			};
		case "solid":
		default:
			return {
				button: undefined,
				pressedButton: undefined,
				text: undefined,
			};
	}
}

function getColor(preset: ButtonPreset) {
	switch (preset) {
		case "danger":
			return colors.danger.main;

		case "secondary":
			return colors.secondary.contrast;

		case "primary":
		default:
			return colors.primary.main;
	}
}

const styles = StyleSheet.create({
	primaryButton: {
		backgroundColor: colors.primary.main,
	},
	primaryPressedButton: {
		backgroundColor: colors.primary.pressed,
	},
	primaryText: {
		color: colors.primary.contrast,
	},

	secondaryButton: {
		backgroundColor: colors.secondary.main,
	},
	secondaryPressedButton: {
		backgroundColor: colors.secondary.pressed,
	},
	secondaryText: {
		color: colors.secondary.contrast,
	},

	dangerButton: {
		backgroundColor: colors.danger.main,
	},
	dangerPressedButton: {
		opacity: 0.8,
	},
	dangerText: {
		color: colors.primary.contrast,
	},

	outlineButton: {
		backgroundColor: "transparent",
		borderWidth: 1,
	},
	outlinePressedButton: {
		opacity: 0.7,
	},

	ghostButton: {
		backgroundColor: "transparent",
	},
	ghostPressedButton: {
		opacity: 0.6,
	},
});
