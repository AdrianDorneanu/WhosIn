import Toast from "react-native-toast-message";

export type AppToastType = "success" | "info" | "error";

export interface ShowToastOptions {
	description?: string;
	duration?: number;
	onPress?: () => void;
	title: string;
}

function show(type: AppToastType, options: ShowToastOptions) {
	Toast.show({
		onPress: options.onPress,
		text1: options.title,
		text2: options.description,
		type,
		visibilityTime: options.duration,
	});
}

export const toast = {
	success: (options: ShowToastOptions) => show("success", options),
	info: (options: ShowToastOptions) => show("info", options),
	error: (options: ShowToastOptions) => show("error", options),
	hide: () => Toast.hide(),
};
