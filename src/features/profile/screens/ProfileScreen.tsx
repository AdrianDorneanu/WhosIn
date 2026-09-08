import { useLogout, useMe } from "@/api";
import { Button, Divider } from "@/components";
import { colors, spacing, typography } from "@/theme";
import { faCalendarDays, faCircleQuestion, faEnvelope, faGear } from "@fortawesome/free-solid-svg-icons";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { ProfileAction } from "@/features/profile/components";

export function ProfileScreen() {
	const { data: profile } = useMe();
	const logout = useLogout();

	const { displayName, email } = profile;

	async function handleLogout() {
		await logout();

		router.replace("/login");
	}

	return (
		<View style={styles.container}>
			<View style={styles.identity}>
				<Text style={styles.displayName}>{displayName}</Text>

				<Text style={styles.email}>{email}</Text>
			</View>

			<View style={styles.actions}>
				<ProfileAction icon={faCalendarDays} title="My games" />
				<Divider />
				<ProfileAction icon={faEnvelope} title="My invites" />
				<Divider />
				<ProfileAction icon={faGear} title="Settings" />
				<Divider />
				<ProfileAction icon={faCircleQuestion} title="Help & support" />
			</View>

			<View style={styles.logout}>
				<Button title="Log out" preset="danger" variant="outline" onPress={handleLogout} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: spacing[6],
		paddingTop: spacing[8],
		paddingBottom: spacing[8],
	},
	identity: {
		alignItems: "center",
		gap: spacing[1],
	},
	displayName: {
		color: colors.text.primary,
		textAlign: "center",
		...typography.heading2,
	},
	email: {
		color: colors.text.secondary,
		textAlign: "center",
		...typography.bodyMedium,
	},
	actions: {
		borderColor: colors.border.default,
		borderRadius: spacing[2],
		borderWidth: StyleSheet.hairlineWidth,
		overflow: "hidden",
	},

	logout: {
		marginTop: "auto",
	},
});
