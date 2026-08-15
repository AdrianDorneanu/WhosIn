import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCircleCheck, faCircleExclamation, faCircleInfo, faXmark } from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import Toast, { type ToastConfig, type ToastConfigParams } from "react-native-toast-message";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors, fontFamily, spacing, typography } from "@/theme";

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
	description?: string;
	onClose: () => void;
	title?: string;
	type: AppToastType;
}

function ToastCard({ description, onClose, title, type }: ToastCardProps) {
	const variant = variants[type];

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
		</View>
	);
}

function createToastRenderer(type: AppToastType): ToastConfig[string] {
	function ToastRenderer({ hide, text1, text2 }: ToastConfigParams<unknown>) {
		return <ToastCard description={text2} onClose={hide} title={text1} type={type} />;
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
			visibilityTime={3000}
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
});
