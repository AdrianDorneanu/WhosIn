import { colors, spacing } from "@/theme";
import { useRouter } from "expo-router";
import type { BottomTabBarProps } from "expo-router/js-tabs";
import { useTheme } from "expo-router/react-navigation";
import { Fragment } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Svg, { Path } from "react-native-svg";

export function TabBar({ state, descriptors, emitter, navigateToTab, insets }: BottomTabBarProps) {
	const router = useRouter();
	const theme = useTheme();

	return (
		<View
			style={[
				styles.container,
				{
					backgroundColor: theme.colors.background,
					paddingBottom: Math.max(insets.bottom, spacing[3]),
					paddingLeft: Math.max(insets.left, spacing[6]),
					paddingRight: Math.max(insets.right, spacing[6]),
				},
			]}
		>
			<View style={styles.bar}>
				{state.routes.map((route, index) => {
					const { options } = descriptors[route.key];
					const focused = state.index === index;
					const color = focused ? colors.primary.main : colors.text.muted;
					const label = options.title ?? route.name;

					function handlePress() {
						const event = emitter.emit({
							type: "tabPress",
							target: route.key,
							canPreventDefault: true,
						});

						if (!focused && !event.defaultPrevented) {
							navigateToTab(route.key);
						}
					}

					return (
						<Fragment key={route.key}>
							<Pressable
								accessibilityRole="tab"
								accessibilityState={{ selected: focused }}
								aria-selected={focused}
								accessibilityLabel={options.tabBarAccessibilityLabel ?? label}
								testID={options.tabBarButtonTestID}
								onPress={handlePress}
								onLongPress={() => emitter.emit({ type: "tabLongPress", target: route.key })}
								style={styles.tab}
							>
								{({ pressed }) => (
									<View style={[styles.icon, (focused || pressed) && styles.activeTab]}>
										{options.tabBarIcon?.({ focused, color, size: 22 })}
									</View>
								)}
							</Pressable>

							{index === 0 ? (
								<View style={styles.createSlot}>
									<Pressable
										accessibilityRole="button"
										accessibilityLabel="Create a game"
										onPress={() => router.push("/create-game")}
										style={({ pressed }) => [
											styles.createButton,
											pressed && styles.createButtonPressed,
										]}
									>
										<Svg width={26} height={26} viewBox="0 0 24 24" accessible={false}>
											<Path
												d="M12 5V19M5 12H19"
												fill="none"
												stroke={colors.primary.contrast}
												strokeWidth={1.75}
												strokeLinecap="round"
											/>
										</Svg>
									</Pressable>
								</View>
							) : null}
						</Fragment>
					);
				})}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingTop: spacing[2],
	},
	bar: {
		alignItems: "center",
		backgroundColor: colors.background.card,
		borderColor: colors.border.default,
		borderRadius: spacing[10],
		borderWidth: StyleSheet.hairlineWidth,
		boxShadow: "0 6px 24px rgba(0, 0, 0, 0.3)",
		flexDirection: "row",
		minHeight: spacing[20],
		paddingHorizontal: spacing[3],
		paddingVertical: spacing[2],
	},
	tab: {
		alignItems: "center",
		flex: 1,
		justifyContent: "center",
		minHeight: spacing[16],
	},
	activeTab: {
		backgroundColor: colors.secondary.pressed,
		borderColor: colors.primary.main,
	},
	icon: {
		alignItems: "center",
		borderColor: "transparent",
		borderRadius: spacing[7],
		borderWidth: 1,
		height: spacing[14],
		justifyContent: "center",
		width: spacing[14],
	},
	createSlot: {
		alignItems: "center",
		flex: 1,
		justifyContent: "center",
	},
	createButton: {
		alignItems: "center",
		backgroundColor: colors.primary.main,
		borderRadius: spacing[7],
		boxShadow: "0 4px 12px rgba(74, 222, 128, 0.14)",
		height: spacing[14],
		justifyContent: "center",
		width: spacing[14],
	},
	createButtonPressed: {
		backgroundColor: colors.primary.pressed,
		transform: [{ scale: 0.95 }],
	},
});
