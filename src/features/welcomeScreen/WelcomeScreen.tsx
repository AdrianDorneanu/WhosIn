import { Button, TextLink } from "@/components";
import { spacing, typography } from "@/theme";
import { StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";

export function WelcomeScreen() {
	return (
		<View style={styles.container}>
			<View style={styles.headerContainer}>
				<Text style={styles.header}>Organize games without group chat chaos</Text>
				<Text style={styles.description}>Create games in seconds and keep everyone in the loop</Text>
			</View>

			<View style={styles.buttonContainer}>
				<Button title="Create a game" onPress={() => router.push("/create-game")} />
				<Button title="I received a link" onPress={() => null} preset="secondary" variant="outline" />
				<View style={styles.loginLink}>
					<TextLink label="Log in" onPress={() => router.push("/login")} prompt="Already have an account?" />
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		gap: spacing[12],
	},
	headerContainer: {
		gap: spacing[2],
	},
	header: {
		textAlign: "center",
		...typography.heading1,
	},
	description: {
		textAlign: "center",
		...typography.bodyMedium,
	},
	buttonContainer: {
		gap: spacing[2],
	},
	loginLink: {
		marginTop: spacing[2],
	},
});
