import { colors } from "@/theme";
import { useEffect, useState } from "react";
import { Animated } from "react-native";

export function useFocusBorderStyle(isFocused: boolean, disabled?: boolean) {
	const [focusProgress] = useState(() => new Animated.Value(0));

	useEffect(() => {
		Animated.timing(focusProgress, {
			duration: 160,
			toValue: isFocused && !disabled ? 1 : 0,
			useNativeDriver: false,
		}).start();
	}, [disabled, focusProgress, isFocused]);

	if (disabled) {
		return undefined;
	}

	return {
		borderColor: focusProgress.interpolate({
			inputRange: [0, 1],
			outputRange: [colors.border.strong, colors.primary.main],
		}),
	};
}
