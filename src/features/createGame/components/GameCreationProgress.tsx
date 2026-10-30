import { colors, fontFamily, spacing, typography } from "@/theme";
import { createContext, PropsWithChildren, useCallback, useContext, useEffect } from "react";
import { useFocusEffect } from "expo-router";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import Animated, {
	cancelAnimation,
	Easing,
	ReduceMotion,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
	type SharedValue,
} from "react-native-reanimated";

const ProgressContext = createContext<SharedValue<number> | undefined>(undefined);

export function GameCreationProgressProvider({ children }: PropsWithChildren) {
	const progress = useSharedValue(0);

	useEffect(() => () => cancelAnimation(progress), [progress]);

	return <ProgressContext.Provider value={progress}>{children}</ProgressContext.Provider>;
}

interface GameCreationProgressProps {
	step: 1 | 2;
}

export function GameCreationProgress({ step }: GameCreationProgressProps) {
	const progress = useContext(ProgressContext);
	if (!progress) {
		throw new Error("GameCreationProgress must be used inside GameCreationProgressProvider");
	}
	const stage = step === 1 ? "Game details" : "Review & create";
	const animatedStyle = useAnimatedStyle<ViewStyle>(() => ({
		width: `${progress.get() * 100}%`,
	}));

	useFocusEffect(
		useCallback(() => {
			progress.set(
				withTiming(step / 2, {
					duration: 480,
					easing: Easing.out(Easing.cubic),
					reduceMotion: ReduceMotion.System,
				}),
			);
		}, [progress, step]),
	);

	return (
		<View
			accessible
			accessibilityRole="progressbar"
			accessibilityLabel="Game creation"
			accessibilityLiveRegion="polite"
			accessibilityValue={{ min: 0, max: 2, now: step, text: `Step ${step} of 2: ${stage}` }}
			style={styles.container}
		>
			<View style={styles.labels}>
				<Text style={styles.step}>Step {step} of 2</Text>
				<Text style={styles.stage}>{stage}</Text>
			</View>
			<View style={styles.track}>
				<Animated.View style={[styles.fill, animatedStyle]} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		gap: spacing[2],
	},
	labels: {
		alignItems: "center",
		flexDirection: "row",
		flexWrap: "wrap",
		columnGap: spacing[3],
		rowGap: spacing[1],
		justifyContent: "space-between",
	},
	step: {
		...typography.caption,
		color: colors.text.muted,
	},
	stage: {
		...typography.caption,
		color: colors.primary.dark,
		fontFamily: fontFamily.semibold,
	},
	track: {
		backgroundColor: colors.primary.light,
		borderRadius: spacing[2],
		height: 6,
		overflow: "hidden",
	},
	fill: {
		backgroundColor: colors.primary.main,
		borderRadius: spacing[2],
		height: "100%",
	},
});
