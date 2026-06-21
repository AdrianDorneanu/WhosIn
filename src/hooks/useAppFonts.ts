import {
	Manrope_400Regular,
	Manrope_500Medium,
	Manrope_600SemiBold,
	Manrope_700Bold,
	useFonts,
} from "@expo-google-fonts/manrope";

export function useAppFonts() {
	const [fontsLoaded] = useFonts({
		Manrope_400Regular,
		Manrope_500Medium,
		Manrope_600SemiBold,
		Manrope_700Bold,
	});

	return fontsLoaded;
}
