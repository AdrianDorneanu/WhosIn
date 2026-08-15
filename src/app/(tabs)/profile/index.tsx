import { ScreenLayout } from "@/components";
import { Text } from "react-native";

export default function ProfileRoute() {
	return (
		<ScreenLayout edges={["top", "left", "right"]}>
			<Text>Profile Screen</Text>
		</ScreenLayout>
	);
}
