import { useFocusBorderStyle } from "@/hooks/useFocusBorderStyle";
import { colors, spacing, typography } from "@/theme";
import { useState } from "react";
import { Animated, StyleSheet, Text, TextInput, View } from "react-native";

import { TextInputFieldProps } from "./types";

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export function TextInputField({
	label,
	value,
	placeholder,
	error,
	required,
	onChangeText,
	keyboardType,
	multiline,
	returnKeyType,
}: TextInputFieldProps) {
	const [isFocused, setIsFocused] = useState(false);
	const animatedInputStyle = useFocusBorderStyle(isFocused, Boolean(error));

	return (
		<View style={styles.container}>
			<Text style={[styles.label, isFocused && styles.labelFocused, error && styles.labelError]}>
				{label}
				{required ? <Text style={styles.required}> *</Text> : null}
			</Text>

			<AnimatedTextInput
				keyboardType={keyboardType}
				multiline={multiline}
				onBlur={() => setIsFocused(false)}
				onChangeText={onChangeText}
				onFocus={() => setIsFocused(true)}
				placeholder={placeholder}
				placeholderTextColor={colors.text.muted}
				returnKeyType={returnKeyType}
				style={[
					styles.input,
					animatedInputStyle,
					error && styles.inputError,
					multiline && styles.multilineInput,
				]}
				value={value}
			/>

			{error ? <Text style={styles.error}>{error}</Text> : null}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		gap: spacing[2],
	},
	label: {
		color: colors.text.primary,
		...typography.caption,
		fontFamily: typography.button.fontFamily,
	},
	labelFocused: {
		color: colors.primary.dark,
	},
	labelError: {
		color: colors.danger.main,
	},
	input: {
		backgroundColor: colors.background.card,
		borderColor: colors.border.strong,
		borderRadius: spacing[3],
		borderWidth: 1,
		color: colors.text.primary,
		minHeight: spacing[14],
		paddingHorizontal: spacing[3],
		...typography.bodyMedium,
	},
	inputError: {
		borderColor: colors.danger.outline,
	},
	multilineInput: {
		minHeight: spacing[24],
		paddingTop: spacing[3],
		textAlignVertical: "top",
	},
	error: {
		color: colors.danger.main,
		...typography.caption,
	},
	required: {
		color: colors.danger.main,
	},
});
