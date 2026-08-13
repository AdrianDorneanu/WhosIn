import { Stack } from "expo-router";
import { colors } from "@/theme";
import { useAppFonts } from "@/hooks/useAppFonts";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/api";
import { useAuthStore } from "@/stores";
import { useEffect } from "react";
import { restoreAuth } from "@/utils";

export default function RootLayout() {
	const fontsLoaded = useAppFonts();
	const isHydrated = useAuthStore((state) => state.isHydrated);
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

	useEffect(() => {
		void restoreAuth();
	}, []);

	if (!isHydrated) {
		return null;
	}

	if (!fontsLoaded) {
		return null;
	}

	return (
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
		</QueryClientProvider>
	);
}
