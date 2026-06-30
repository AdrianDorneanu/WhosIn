import { ScreenLayout } from "@/components";
import { colors } from "@/theme";
import { Stack } from "expo-router";

export default function CreateGameLayout() {
	return (
		<ScreenLayout>
			<Stack
				screenOptions={{
					headerShown: false,
					animation: "slide_from_right",
					contentStyle: {
						backgroundColor: colors.white,
					},
				}}
			/>
		</ScreenLayout>
	);
}
