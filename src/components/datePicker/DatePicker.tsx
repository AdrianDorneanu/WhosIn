import { colors, fontFamily, spacing, typography } from "@/theme";
import { faChevronDown, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useState } from "react";
import { Animated, Modal, Pressable, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { Calendar, DateData } from "react-native-calendars";

import { DatePickerProps } from "./types";

interface CalendarMonth {
	getFullYear: () => number;
	getMonth: () => number;
}

interface CalendarHeaderProps {
	month?: CalendarMonth;
	addMonth?: (count: number) => void;
}

function formatDate(value?: string) {
	if (!value) {
		return undefined;
	}

	const date = new Date(`${value}T00:00:00`);

	return new Intl.DateTimeFormat("en", {
		day: "numeric",
		month: "short",
		weekday: "short",
	}).format(date);
}

function formatCalendarMonth(date?: CalendarMonth) {
	if (!date) {
		return "";
	}

	return new Intl.DateTimeFormat("en", {
		month: "long",
		year: "numeric",
	}).format(new Date(date.getFullYear(), date.getMonth(), 1));
}

function CalendarHeader({ month, addMonth }: CalendarHeaderProps) {
	return (
		<View style={styles.calendarHeader}>
			<View style={styles.calendarNavigation}>
				<Pressable onPress={() => addMonth?.(-1)} style={styles.calendarArrow}>
					<FontAwesomeIcon color={colors.primary.main} icon={faChevronLeft} size={16} />
				</Pressable>

				<Text numberOfLines={1} style={styles.calendarTitle}>
					{formatCalendarMonth(month)}
				</Text>

				<Pressable onPress={() => addMonth?.(1)} style={styles.calendarArrow}>
					<FontAwesomeIcon color={colors.primary.main} icon={faChevronRight} size={16} />
				</Pressable>
			</View>

			<View style={styles.weekDays}>
				{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
					<Text key={day} style={styles.weekDay}>
						{day}
					</Text>
				))}
			</View>
		</View>
	);
}

export function DatePicker({
	label,
	value,
	placeholder = "Select date",
	drawerTitle = "Choose a date",
	error,
	required,
	onValueChange,
}: DatePickerProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [draftValue, setDraftValue] = useState(value);
	const [drawerProgress] = useState(() => new Animated.Value(0));
	const formattedValue = formatDate(value);

	function openDrawer() {
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

	function handleDayPress(day: DateData) {
		setDraftValue(day.dateString);
	}

	function handleDone() {
		if (draftValue) {
			onValueChange(draftValue);
		}

		closeDrawer();
	}

	return (
		<View style={styles.container}>
			<Text style={styles.label}>
				{label}
				{required ? <Text style={styles.required}> *</Text> : null}
			</Text>

			<Pressable
				accessibilityRole="button"
				onPress={openDrawer}
				style={({ pressed }) => [styles.trigger, error && styles.triggerError, pressed && styles.triggerPressed]}
			>
				<View style={styles.valueContainer}>
					<Text numberOfLines={1} style={[styles.value, !formattedValue && styles.placeholder]}>
						{formattedValue ?? placeholder}
					</Text>
				</View>

				<FontAwesomeIcon color={colors.text.secondary} icon={faChevronDown} size={14} />
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

								<Calendar
									current={draftValue}
									markedDates={
										draftValue
											? {
													[draftValue]: {
														selected: true,
														selectedColor: colors.primary.main,
														selectedTextColor: colors.primary.contrast,
													},
												}
											: undefined
									}
									onDayPress={handleDayPress}
									customHeader={CalendarHeader}
									style={styles.calendar}
									theme={{
										arrowColor: colors.primary.main,
										calendarBackground: colors.background.card,
										dayTextColor: colors.text.primary,
										monthTextColor: colors.text.primary,
										selectedDayBackgroundColor: colors.primary.main,
										selectedDayTextColor: colors.primary.contrast,
										textDayFontFamily: fontFamily.medium,
										textDayFontSize: 15,
										textDayHeaderFontFamily: fontFamily.semibold,
										textDayHeaderFontSize: 12,
										textDisabledColor: colors.border.strong,
										textMonthFontFamily: fontFamily.bold,
										textMonthFontSize: 18,
										textSectionTitleColor: colors.text.muted,
										todayTextColor: colors.primary.main,
									}}
								/>

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
	triggerError: {
		backgroundColor: colors.danger.light,
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
	calendar: {
		marginHorizontal: -spacing[2],
	},
	calendarHeader: {
		marginBottom: spacing[2],
	},
	calendarNavigation: {
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "center",
		marginBottom: spacing[3],
		minHeight: spacing[10],
	},
	calendarArrow: {
		alignItems: "center",
		height: spacing[10],
		justifyContent: "center",
		width: spacing[10],
	},
	calendarTitle: {
		color: colors.text.primary,
		flex: 1,
		textAlign: "center",
		...typography.heading3,
	},
	weekDays: {
		flexDirection: "row",
	},
	weekDay: {
		color: colors.text.muted,
		flex: 1,
		textAlign: "center",
		...typography.caption,
		fontFamily: fontFamily.semibold,
	},
	actions: {
		flexDirection: "row",
		gap: spacing[3],
		marginTop: spacing[4],
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
