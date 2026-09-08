import { ScreenLayout } from "@/components";
import { ProfileScreen } from "@/features";

export default function ProfileRoute() {
	return (
		<ScreenLayout edges={["top", "left", "right"]}>
			<ProfileScreen />
		</ScreenLayout>
	);
}
