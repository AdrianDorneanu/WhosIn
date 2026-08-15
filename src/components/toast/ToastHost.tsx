import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCircleCheck, faCircleExclamation, faCircleInfo, faXmark } from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import Toast, { type ToastConfig, type ToastConfigParams } from "react-native-toast-message";
import { useEffect, useState } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors, fontFamily, spacing, typography } from "@/theme";
import { DEFAULT_TOAST_DURATION } from "./toast";

type AppToastType = "success" | "info" | "error";

interface ToastVariant {
	backgroundColor: string;
	borderColor: string;
	icon: IconDefinition;
	iconColor: string;
}

const variants: Record<AppToastType, ToastVariant> = {
	success: {
		backgroundColor: colors.primary.light,
		borderColor: colors.green[400],
		icon: faCircleCheck,
		iconColor: colors.green[600],
	},
	info: {
		backgroundColor: colors.info.light,
		borderColor: colors.info.border,
		icon: faCircleInfo,
		iconColor: colors.info.main,
	},
	error: {
		backgroundColor: colors.danger.light,
		borderColor: colors.danger.border,
		icon: faCircleExclamation,
		iconColor: colors.danger.main,
	},
};

interface ToastCardProps {
	animationKey: number;
	description?: string;
	duration: number;
	onClose: () => void;
	title?: string;
	type: AppToastType;
}

function ToastCard({ animationKey, description, duration, onClose, title, type }: ToastCardProps) {
	const variant = variants[type];
	const [progress] = useState(() => new Animated.Value(1));

	useEffect(() => {
		progress.setValue(1);

		const animation = Animated.timing(progress, {
			duration,
			toValue: 0,
			useNativeDriver: false,
		});

		animation.start();

		return () => animation.stop();
	}, [animationKey, duration, progress]);

	return (
		<View
			accessible
			accessibilityRole="alert"
			style={[
				styles.toast,
				{
					backgroundColor: variant.backgroundColor,
					borderColor: variant.borderColor,
				},
			]}
		>
			<FontAwesomeIcon color={variant.iconColor} icon={variant.icon} size={spacing[6]} />

			<View style={styles.content}>
				{title ? <Text style={styles.title}>{title}</Text> : null}
				{description ? <Text style={styles.description}>{description}</Text> : null}
			</View>

			<Pressable
				accessibilityLabel="Închide notificarea"
				accessibilityRole="button"
				hitSlop={spacing[2]}
				onPress={onClose}
				style={({ pressed }) => [styles.closeButton, pressed && styles.closeButtonPressed]}
			>
				<FontAwesomeIcon color={colors.text.secondary} icon={faXmark} size={spacing[4]} />
			</Pressable>

			<Animated.View
				pointerEvents="none"
				style={[
					styles.progress,
					{
						backgroundColor: variant.iconColor,
						width: progress.interpolate({
							inputRange: [0, 1],
							outputRange: ["0%", "100%"],
						}),
					},
				]}
			/>
		</View>
	);
}

function createToastRenderer(type: AppToastType): ToastConfig[string] {
	function ToastRenderer({
		hide,
		props,
		text1,
		text2,
	}: ToastConfigParams<{ animationKey?: number; duration?: number }>) {
		return (
			<ToastCard
				animationKey={props.animationKey ?? 0}
				description={text2}
				duration={props.duration ?? DEFAULT_TOAST_DURATION}
				onClose={hide}
				title={text1}
				type={type}
			/>
		);
	}

	return ToastRenderer;
}

const toastConfig: ToastConfig = {
	success: createToastRenderer("success"),
	info: createToastRenderer("info"),
	error: createToastRenderer("error"),
};

export function ToastHost() {
	const insets = useSafeAreaInsets();

	return (
		<Toast
			bottomOffset={Math.max(insets.bottom, spacing[4]) + spacing[4]}
			config={toastConfig}
			position="bottom"
			swipeable
			visibilityTime={DEFAULT_TOAST_DURATION}
		/>
	);
}

const styles = StyleSheet.create({
	toast: {
		alignItems: "center",
		alignSelf: "center",
		borderRadius: spacing[3],
		borderWidth: 1,
		flexDirection: "row",
		gap: spacing[3],
		maxWidth: 480,
		minHeight: spacing[16],
		overflow: "hidden",
		paddingHorizontal: spacing[3],
		paddingVertical: spacing[3],
		shadowColor: colors.text.primary,
		shadowOffset: {
			height: 4,
			width: 0,
		},
		shadowOpacity: 0.1,
		shadowRadius: 12,
		width: "88%",
		elevation: 4,
	},
	content: {
		flex: 1,
		gap: spacing[1],
	},
	title: {
		color: colors.text.primary,
		fontFamily: fontFamily.semibold,
		fontSize: 13,
		lineHeight: 18,
	},
	description: {
		color: colors.text.secondary,
		...typography.caption,
	},
	closeButton: {
		alignItems: "center",
		borderRadius: spacing[4],
		height: spacing[8],
		justifyContent: "center",
		width: spacing[8],
	},
	closeButtonPressed: {
		backgroundColor: colors.overlay.dark,
	},
	progress: {
		bottom: 0,
		height: 3,
		left: 0,
		position: "absolute",
	},
});
