import "../global.css";
import { DarkTheme, Stack, ThemeProvider } from "expo-router";
import { colors } from "@/theme";
import { useAppFonts } from "@/hooks/useAppFonts";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/api";
import { useAuthStore } from "@/stores";
import { PropsWithChildren, useCallback, useEffect, useState } from "react";
import { Appearance, Platform, StyleSheet, View } from "react-native";
import { restoreAuth } from "@/utils";
import { SplashArtwork, ToastHost } from "@/components";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";

const navigationTheme = {
	...DarkTheme,
	colors: {
		...DarkTheme.colors,
		primary: colors.primary.main,
		background: colors.background.app,
		card: colors.background.card,
		text: colors.text.primary,
		border: colors.border.default,
		notification: colors.danger.main,
	},
};

SplashScreen.preventAutoHideAsync().catch((error: unknown) => {
	console.error("Failed to keep the splash screen visible", error);
});

function WebSafeArea({ children }: PropsWithChildren) {
	if (Platform.OS !== "web") {
		return children;
	}

	return (
		<div
			style={{
				display: "flex",
				flex: 1,
				flexDirection: "column",
				minHeight: 0,
				minWidth: 0,
				paddingTop: "env(safe-area-inset-top, 0px)",
				paddingRight: "env(safe-area-inset-right, 0px)",
				paddingBottom: "env(safe-area-inset-bottom, 0px)",
				paddingLeft: "env(safe-area-inset-left, 0px)",
			}}
		>
			{children}
		</div>
	);
}

export default function RootLayout() {
	const fontsLoaded = useAppFonts();
	const isHydrated = useAuthStore((state) => state.isHydrated);
	const ready = isHydrated && fontsLoaded;
	const [showArtwork, setShowArtwork] = useState(true);
	const finishArtwork = useCallback(() => setShowArtwork(false), []);

	useEffect(() => {
		if (Platform.OS !== "web") {
			Appearance.setColorScheme("dark");
		}
		void restoreAuth();
	}, []);

	return (
		<ThemeProvider value={navigationTheme}>
			<View style={styles.container}>
				<StatusBar style="light" />
				{ready ? (
					<WebSafeArea>
						<QueryClientProvider client={queryClient}>
							<Stack
								screenOptions={{
									headerShown: false,
									animation: "slide_from_right",
									contentStyle: {
										backgroundColor: colors.background.app,
									},
								}}
							/>
							<ToastHost />
						</QueryClientProvider>
					</WebSafeArea>
				) : null}
				{showArtwork ? <SplashArtwork ready={ready} onFinish={finishArtwork} /> : null}
			</View>
		</ThemeProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background.app,
	},
});
