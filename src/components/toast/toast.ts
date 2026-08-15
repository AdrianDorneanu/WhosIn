import Toast from "react-native-toast-message";

export type AppToastType = "success" | "info" | "error";

export const DEFAULT_TOAST_DURATION = 3000;

let toastSequence = 0;

export interface ShowToastOptions {
	description?: string;
	duration?: number;
	onPress?: () => void;
	title: string;
}

function show(type: AppToastType, options: ShowToastOptions) {
	const duration = options.duration ?? DEFAULT_TOAST_DURATION;

	Toast.show({
		onPress: options.onPress,
		props: {
			animationKey: ++toastSequence,
			duration,
		},
		text1: options.title,
		text2: options.description,
		type,
		visibilityTime: duration,
	});
}

export const toast = {
	success: (options: ShowToastOptions) => show("success", options),
	info: (options: ShowToastOptions) => show("info", options),
	error: (options: ShowToastOptions) => show("error", options),
	hide: () => Toast.hide(),
};
