import { Redirect, Tabs } from "expo-router";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHome, faUser } from "@fortawesome/free-solid-svg-icons";
import { colors } from "@/theme";
import { useAuthStore } from "@/stores";

export default function TabsLayout() {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

	if (!isAuthenticated) {
		return <Redirect href="/" />;
	}

	return (
		<Tabs
			initialRouteName="home"
			screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: colors.primary.main,
				tabBarInactiveTintColor: colors.text.muted,
			}}
		>
			<Tabs.Screen
				name="home"
				options={{
					title: "Home",
					tabBarIcon: ({ color, size }) => (
						<FontAwesomeIcon icon={faHome} size={size} color={String(color)} />
					),
				}}
			/>

			<Tabs.Screen
				name="profile"
				options={{
					title: "Profile",
					tabBarIcon: ({ color, size }) => (
						<FontAwesomeIcon icon={faUser} size={size} color={String(color)} />
					),
				}}
			/>
		</Tabs>
	);
}
