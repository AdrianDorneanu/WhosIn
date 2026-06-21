import { Stack } from "expo-router";
import { colors } from "@/theme";
import { useAppFonts } from "@/hooks/useAppFonts";

export default function RootLayout() {
	const fontsLoaded = useAppFonts();

	if (!fontsLoaded) {
		return null;
	}

	return (
		<Stack
			screenOptions={{
				headerShown: false,
				animation: "slide_from_right",
				contentStyle: {
					backgroundColor: colors.white,
				},
			}}
		/>
	);
}
