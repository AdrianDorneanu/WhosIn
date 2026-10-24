import { Stack } from "expo-router";
import { colors } from "@/theme";
import { useAppFonts } from "@/hooks/useAppFonts";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/api";
import { useAuthStore } from "@/stores";
import { useCallback, useEffect, useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { restoreAuth } from "@/utils";
import { SplashArtwork, ToastHost } from "@/components";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync().catch((error: unknown) => {
	console.error("Failed to keep the splash screen visible", error);
});

export default function RootLayout() {
	const fontsLoaded = useAppFonts();
	const isHydrated = useAuthStore((state) => state.isHydrated);
	const ready = isHydrated && fontsLoaded;
	const [showArtwork, setShowArtwork] = useState(Platform.OS !== "web");
	const finishArtwork = useCallback(() => setShowArtwork(false), []);

	useEffect(() => {
		void restoreAuth();
	}, []);

	useEffect(() => {
		if (ready && Platform.OS === "web") {
			SplashScreen.hide();
		}
	}, [ready]);

	return (
		<View style={styles.container}>
			{ready ? (
				<QueryClientProvider client={queryClient}>
					<Stack
						screenOptions={{
							headerShown: false,
							animation: "slide_from_right",
							contentStyle: {
								backgroundColor: colors.white,
							},
						}}
					/>
					<ToastHost />
				</QueryClientProvider>
			) : null}
			{showArtwork ? <SplashArtwork ready={ready} onFinish={finishArtwork} /> : null}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white,
	},
});
