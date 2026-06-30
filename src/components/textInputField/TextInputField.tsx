import { colors, spacing, typography } from "@/theme";
import { StyleSheet, Text, TextInput, View } from "react-native";

import { TextInputFieldProps } from "./types";

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
	return (
		<View style={styles.container}>
			<Text style={styles.label}>
				{label}
				{required ? <Text style={styles.required}> *</Text> : null}
			</Text>

			<TextInput
				keyboardType={keyboardType}
				multiline={multiline}
				onChangeText={onChangeText}
				placeholder={placeholder}
				placeholderTextColor={colors.text.muted}
				returnKeyType={returnKeyType}
				style={[styles.input, error && styles.inputError, multiline && styles.multilineInput]}
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
		backgroundColor: colors.danger.light,
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
