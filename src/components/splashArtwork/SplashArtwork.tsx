import { Image } from "expo-image";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { Animated, StyleSheet } from "react-native";

interface SplashArtworkProps {
	ready: boolean;
	onFinish: () => void;
}

export function SplashArtwork({ ready, onFinish }: SplashArtworkProps) {
	const [imageDisplayed, setImageDisplayed] = useState(false);
	const [opacity] = useState(() => new Animated.Value(1));

	useEffect(() => {
		if (!ready || !imageDisplayed) {
			return;
		}

		const animation = Animated.timing(opacity, {
			toValue: 0,
			duration: 250,
			useNativeDriver: true,
		});

		animation.start(({ finished }) => {
			if (finished) {
				onFinish();
			}
		});

		return () => animation.stop();
	}, [ready, imageDisplayed, opacity, onFinish]);

	function revealArtwork() {
		SplashScreen.hide();
		setImageDisplayed(true);
	}

	return (
		<Animated.View style={[styles.container, { opacity }]} accessibilityViewIsModal>
			<Image
				source={require("../../../assets/images/splash-art.png")}
				style={StyleSheet.absoluteFill}
				contentFit="cover"
				accessibilityLabel="Who's In"
				onDisplay={revealArtwork}
				onError={({ error }) => {
					console.error("Failed to display splash artwork", error);
					revealArtwork();
				}}
			/>
		</Animated.View>
	);
}

const styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFill,
		backgroundColor: "#FFFFFF",
		zIndex: 1,
	},
});
