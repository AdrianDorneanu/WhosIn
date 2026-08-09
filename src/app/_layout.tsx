import { Stack } from "expo-router";
import { colors } from "@/theme";
import { useAppFonts } from "@/hooks/useAppFonts";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/api";

export default function RootLayout() {
	const fontsLoaded = useAppFonts();

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
