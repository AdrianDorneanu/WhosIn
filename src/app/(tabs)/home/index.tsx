import { ScreenLayout } from "@/components";
import { HomeScreen } from "@/features";

export default function HomeRoute() {
	return (
		<ScreenLayout edges={["top", "left", "right"]}>
			<HomeScreen />
		</ScreenLayout>
	);
}
