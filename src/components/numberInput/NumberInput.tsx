import { colors, spacing, typography } from "@/theme";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { NumberInputProps } from "./types";

export function NumberInput({
	label,
	value,
	min = 0,
	max,
	step = 1,
	error,
	required,
	onValueChange,
}: NumberInputProps) {
	const canDecrease = value > min;
	const canIncrease = max === undefined || value < max;

	function updateValue(nextValue: number) {
		const withMin = Math.max(min, nextValue);
		const clampedValue = max === undefined ? withMin : Math.min(max, withMin);

		onValueChange(clampedValue);
	}

	return (
		<View style={styles.container}>
			<Text style={[styles.label, error && styles.labelError]}>
				{label}
				{required ? <Text style={styles.required}> *</Text> : null}
			</Text>

			<View style={[styles.input, error && styles.inputError]}>
				<Text style={styles.value}>{value}</Text>

				<View style={styles.controls}>
					<Pressable
						accessibilityRole="button"
						disabled={!canDecrease}
						onPress={() => updateValue(value - step)}
						style={({ pressed }) => [
							styles.controlButton,
							pressed && canDecrease && styles.controlButtonPressed,
							!canDecrease && styles.controlButtonDisabled,
						]}
					>
						<FontAwesomeIcon
							color={canDecrease ? colors.primary.main : colors.text.muted}
							icon={faMinus}
							size={12}
						/>
					</Pressable>

					<Pressable
						accessibilityRole="button"
						disabled={!canIncrease}
						onPress={() => updateValue(value + step)}
						style={({ pressed }) => [
							styles.controlButton,
							pressed && canIncrease && styles.controlButtonPressed,
							!canIncrease && styles.controlButtonDisabled,
						]}
					>
						<FontAwesomeIcon
							color={canIncrease ? colors.primary.main : colors.text.muted}
							icon={faPlus}
							size={12}
						/>
					</Pressable>
				</View>
			</View>

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
	labelError: {
		color: colors.danger.main,
	},
	input: {
		alignItems: "center",
		backgroundColor: colors.background.card,
		borderColor: colors.border.strong,
		borderRadius: spacing[3],
		borderWidth: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		minHeight: spacing[14],
		paddingHorizontal: spacing[3],
	},
	inputError: {
		borderColor: colors.danger.outline,
	},
	value: {
		color: colors.text.primary,
		...typography.bodyMedium,
	},
	controls: {
		flexDirection: "row",
		gap: spacing[2],
	},
	controlButton: {
		alignItems: "center",
		backgroundColor: colors.primary.light,
		borderRadius: spacing[4],
		height: spacing[8],
		justifyContent: "center",
		width: spacing[8],
	},
	controlButtonPressed: {
		backgroundColor: colors.green[100],
	},
	controlButtonDisabled: {
		backgroundColor: colors.background.muted,
	},
	error: {
		color: colors.danger.main,
		...typography.caption,
	},
	required: {
		color: colors.danger.main,
	},
});
