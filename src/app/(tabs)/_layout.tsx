import { Tabs } from "expo-router";
import { TabBar } from "@/components";
import Svg, { Circle, Path } from "react-native-svg";

export default function TabsLayout() {
	return (
		<Tabs
			tabBar={(props) => <TabBar {...props} />}
			screenOptions={{
				headerShown: false,
			}}
		>
			<Tabs.Screen
				name="home"
				options={{
					title: "Home",
					tabBarIcon: ({ color, size }) => (
						<Svg
							width={size}
							height={size}
							viewBox="0 0 24 24"
							fill="none"
							stroke={color}
							strokeWidth={1.75}
							strokeLinecap="round"
							strokeLinejoin="round"
							accessible={false}
						>
							<Path d="M3 10L12 3L21 10M5 9V20A1 1 0 0 0 6 21H9V14H15V21H18A1 1 0 0 0 19 20V9" />
						</Svg>
					),
				}}
			/>

			<Tabs.Screen
				name="profile"
				options={{
					title: "Profile",
					tabBarIcon: ({ color, size }) => (
						<Svg
							width={size}
							height={size}
							viewBox="0 0 24 24"
							fill="none"
							stroke={color}
							strokeWidth={1.75}
							strokeLinecap="round"
							strokeLinejoin="round"
							accessible={false}
						>
							<Circle cx={12} cy={8} r={4} />
							<Path d="M5 21V19A7 7 0 0 1 19 19V21" />
						</Svg>
					),
				}}
			/>
		</Tabs>
	);
}
