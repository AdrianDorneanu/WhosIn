import { useFocusBorderStyle } from "@/hooks/useFocusBorderStyle";
import { colors, spacing, typography } from "@/theme";
import { faCheck, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useState } from "react";
import {
	Animated,
	Keyboard,
	Modal,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	TouchableWithoutFeedback,
	View,
} from "react-native";

import { TimePickerProps } from "./types";

const timeOptions = Array.from({ length: 48 }, (_, index) => {
	const hour24 = Math.floor(index / 2);
	const minutes = index % 2 === 0 ? "00" : "30";
	const period = hour24 >= 12 ? "PM" : "AM";
	const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;

	return {
		label: `${hour12}:${minutes} ${period}`,
		value: `${hour24.toString().padStart(2, "0")}:${minutes}`,
	};
});

function formatTime(value?: string) {
	if (!value) {
		return undefined;
	}

	const selectedOption = timeOptions.find((option) => option.value === value);

	return selectedOption?.label;
}

export function TimePicker({
	label,
	value,
	placeholder = "Select time",
	drawerTitle = "Choose a time",
	error,
	required,
	onValueChange,
}: TimePickerProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [draftValue, setDraftValue] = useState(value);
	const [drawerProgress] = useState(() => new Animated.Value(0));
	const formattedValue = formatTime(value);
	const animatedTriggerStyle = useFocusBorderStyle(isOpen, Boolean(error));

	function openDrawer() {
		Keyboard.dismiss();
		setDraftValue(value);
		setIsOpen(true);

		Animated.timing(drawerProgress, {
			duration: 220,
			toValue: 1,
			useNativeDriver: true,
		}).start();
	}

	function closeDrawer() {
		Animated.timing(drawerProgress, {
			duration: 180,
			toValue: 0,
			useNativeDriver: true,
		}).start(({ finished }) => {
			if (finished) {
				setIsOpen(false);
			}
		});
	}

	function handleDone() {
		if (draftValue) {
			onValueChange(draftValue);
		}

		closeDrawer();
	}

	return (
		<View style={styles.container}>
			<Text style={[styles.label, isOpen && styles.labelFocused, error && styles.labelError]}>
				{label}
				{required ? <Text style={styles.required}> *</Text> : null}
			</Text>

			<Pressable accessibilityRole="button" onPress={openDrawer}>
				{({ pressed }) => (
					<Animated.View
						style={[
							styles.trigger,
							animatedTriggerStyle,
							error && styles.triggerError,
							pressed && styles.triggerPressed,
						]}
					>
						<View style={styles.valueContainer}>
							<Text numberOfLines={1} style={[styles.value, !formattedValue && styles.placeholder]}>
								{formattedValue ?? placeholder}
							</Text>
						</View>

						<FontAwesomeIcon color={colors.text.secondary} icon={faChevronDown} size={14} />
					</Animated.View>
				)}
			</Pressable>

			{error ? <Text style={styles.error}>{error}</Text> : null}

			<Modal animationType="none" onRequestClose={closeDrawer} transparent visible={isOpen}>
				<View style={styles.modalRoot}>
					<TouchableWithoutFeedback onPress={closeDrawer}>
						<Animated.View style={[styles.backdrop, { opacity: drawerProgress }]} />
					</TouchableWithoutFeedback>

					<View pointerEvents="box-none" style={styles.drawerContainer}>
						<TouchableWithoutFeedback>
							<Animated.View
								style={[
									styles.drawer,
									{
										transform: [
											{
												translateY: drawerProgress.interpolate({
													inputRange: [0, 1],
													outputRange: [420, 0],
												}),
											},
										],
									},
								]}
							>
								<View style={styles.handle} />

								<Text style={styles.drawerTitle}>{drawerTitle}</Text>

								<ScrollView style={styles.optionsContainer}>
									{timeOptions.map((option, index) => {
										const isSelected = option.value === draftValue;
										const isLastOption = index === timeOptions.length - 1;

										return (
											<Pressable
												key={option.value}
												onPress={() => setDraftValue(option.value)}
												style={({ pressed }) => [
													styles.option,
													!isLastOption && styles.optionSeparator,
													isSelected && styles.optionSelected,
													pressed && styles.optionPressed,
												]}
											>
												<Text style={styles.optionLabel}>{option.label}</Text>

												<View style={[styles.radio, isSelected && styles.radioSelected]}>
													{isSelected && (
														<FontAwesomeIcon
															color={colors.primary.contrast}
															icon={faCheck}
															size={10}
														/>
													)}
												</View>
											</Pressable>
										);
									})}
								</ScrollView>

								<View style={styles.actions}>
									<Pressable
										onPress={closeDrawer}
										style={({ pressed }) => [
											styles.actionButton,
											styles.cancelButton,
											pressed && styles.cancelButtonPressed,
										]}
									>
										<Text style={[styles.actionText, styles.cancelText]}>Cancel</Text>
									</Pressable>

									<Pressable
										onPress={handleDone}
										style={({ pressed }) => [
											styles.actionButton,
											styles.doneButton,
											pressed && styles.doneButtonPressed,
										]}
									>
										<Text style={[styles.actionText, styles.doneText]}>Done</Text>
									</Pressable>
								</View>
							</Animated.View>
						</TouchableWithoutFeedback>
					</View>
				</View>
			</Modal>
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
	trigger: {
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
	triggerPressed: {
		backgroundColor: colors.secondary.pressed,
	},
	triggerError: {
		borderColor: colors.danger.outline,
	},
	valueContainer: {
		alignItems: "center",
		flex: 1,
		flexDirection: "row",
		gap: spacing[2],
	},
	value: {
		color: colors.text.primary,
		flex: 1,
		...typography.bodyMedium,
	},
	placeholder: {
		color: colors.text.muted,
	},
	modalRoot: {
		flex: 1,
	},
	backdrop: {
		backgroundColor: "rgba(17, 24, 39, 0.55)",
		bottom: 0,
		left: 0,
		position: "absolute",
		right: 0,
		top: 0,
	},
	drawerContainer: {
		bottom: 0,
		justifyContent: "flex-end",
		left: 0,
		position: "absolute",
		right: 0,
		top: 0,
	},
	drawer: {
		backgroundColor: colors.background.card,
		borderTopLeftRadius: spacing[6],
		borderTopRightRadius: spacing[6],
		maxHeight: "75%",
		paddingBottom: spacing[8],
		paddingHorizontal: spacing[6],
		paddingTop: spacing[3],
	},
	handle: {
		alignSelf: "center",
		backgroundColor: colors.border.strong,
		borderRadius: spacing[1],
		height: 4,
		marginBottom: spacing[4],
		width: spacing[12],
	},
	drawerTitle: {
		color: colors.text.primary,
		marginBottom: spacing[4],
		...typography.heading3,
	},
	optionsContainer: {
		marginBottom: spacing[4],
	},
	option: {
		alignItems: "center",
		borderRadius: spacing[3],
		flexDirection: "row",
		justifyContent: "space-between",
		minHeight: spacing[12],
		paddingHorizontal: spacing[3],
	},
	optionSeparator: {
		borderBottomColor: colors.border.default,
		borderBottomWidth: 1,
	},
	optionSelected: {
		backgroundColor: colors.primary.light,
	},
	optionPressed: {
		backgroundColor: colors.secondary.pressed,
	},
	optionLabel: {
		color: colors.text.primary,
		...typography.bodyMedium,
	},
	radio: {
		alignItems: "center",
		borderColor: colors.border.strong,
		borderRadius: spacing[5],
		borderWidth: 1,
		height: spacing[5],
		justifyContent: "center",
		width: spacing[5],
	},
	radioSelected: {
		backgroundColor: colors.primary.main,
		borderColor: colors.primary.main,
	},
	actions: {
		flexDirection: "row",
		gap: spacing[3],
	},
	actionButton: {
		alignItems: "center",
		borderRadius: spacing[4],
		flex: 1,
		height: spacing[14],
		justifyContent: "center",
	},
	cancelButton: {
		backgroundColor: colors.background.card,
		borderColor: colors.primary.main,
		borderWidth: 1,
	},
	cancelButtonPressed: {
		backgroundColor: colors.primary.light,
	},
	doneButton: {
		backgroundColor: colors.primary.main,
	},
	doneButtonPressed: {
		backgroundColor: colors.primary.pressed,
	},
	actionText: {
		...typography.button,
	},
	cancelText: {
		color: colors.primary.main,
	},
	doneText: {
		color: colors.primary.contrast,
	},
	error: {
		color: colors.danger.main,
		...typography.caption,
	},
	required: {
		color: colors.danger.main,
	},
});
