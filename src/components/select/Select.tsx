import { colors, spacing, typography } from "@/theme";
import { faCheck, faChevronDown, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useState } from "react";
import { Animated, Modal, Pressable, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";

import { SelectProps } from "./types";

export function Select({
	label,
	options,
	value,
	placeholder = "Select an option",
	drawerTitle = `Choose a ${label.toLowerCase()}`,
	searchPlaceholder = "Search",
	onValueChange,
}: SelectProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [search, setSearch] = useState("");
	const [draftValue, setDraftValue] = useState(value);
	const [drawerProgress] = useState(() => new Animated.Value(0));

	const selectedOption = options.find((option) => option.value === value);
	const filteredOptions = options.filter((option) =>
		option.label.toLowerCase().includes(search.trim().toLowerCase()),
	);

	function openDrawer() {
		setDraftValue(value);
		setSearch("");
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
			<Text style={styles.label}>{label}</Text>

			<Pressable
				accessibilityRole="button"
				onPress={openDrawer}
				style={({ pressed }) => [styles.trigger, pressed && styles.triggerPressed]}
			>
				<View style={styles.valueContainer}>
					{selectedOption?.icon}
					<Text numberOfLines={1} style={[styles.value, !selectedOption && styles.placeholder]}>
						{selectedOption?.label ?? placeholder}
					</Text>
				</View>

				<FontAwesomeIcon color={colors.text.secondary} icon={faChevronDown} size={14} />
			</Pressable>

			<Modal animationType="none" onRequestClose={closeDrawer} transparent visible={isOpen}>
				<View style={styles.modalRoot}>
					<TouchableWithoutFeedback onPress={closeDrawer}>
						<Animated.View
							style={[
								styles.backdrop,
								{
									opacity: drawerProgress,
								},
							]}
						/>
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
													outputRange: [360, 0],
												}),
											},
										],
									},
								]}
							>
								<View style={styles.handle} />

								<Text style={styles.drawerTitle}>{drawerTitle}</Text>

								<View style={styles.searchContainer}>
									<FontAwesomeIcon color={colors.text.muted} icon={faMagnifyingGlass} size={14} />
									<TextInput
										autoCorrect={false}
										onChangeText={setSearch}
										placeholder={searchPlaceholder}
										placeholderTextColor={colors.text.muted}
										style={styles.searchInput}
										value={search}
									/>
								</View>

								<View style={styles.optionsContainer}>
									{filteredOptions.map((option) => {
										const isSelected = option.value === draftValue;

										return (
											<Pressable
												key={option.value}
												onPress={() => setDraftValue(option.value)}
												style={({ pressed }) => [
													styles.option,
													isSelected && styles.optionSelected,
													pressed && styles.optionPressed,
												]}
											>
												<View style={styles.valueContainer}>
													{option.icon}
													<Text style={styles.optionLabel}>{option.label}</Text>
												</View>

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
								</View>

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
	searchContainer: {
		alignItems: "center",
		borderColor: colors.border.default,
		borderRadius: spacing[3],
		borderWidth: 1,
		flexDirection: "row",
		gap: spacing[2],
		height: spacing[12],
		paddingHorizontal: spacing[3],
	},
	searchInput: {
		color: colors.text.primary,
		flex: 1,
		padding: 0,
		...typography.caption,
	},
	optionsContainer: {
		marginTop: spacing[3],
		overflow: "hidden",
	},
	option: {
		alignItems: "center",
		borderRadius: spacing[3],
		flexDirection: "row",
		justifyContent: "space-between",
		minHeight: spacing[12],
		paddingHorizontal: spacing[3],
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
		marginTop: spacing[6],
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
});
