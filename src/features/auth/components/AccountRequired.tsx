import { Button } from "@/components";
import { colors, spacing, typography } from "@/theme";
import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";

import lockImage from "../../../../assets/images/lock.png";

interface AccountRequiredProps {
	onLogin: () => void;
	onSignUp: () => void;
}

export function AccountRequired({ onLogin, onSignUp }: AccountRequiredProps) {
	return (
		<View style={styles.container}>
			<View style={styles.content}>
				<View style={styles.imageContainer}>
					<Image accessibilityLabel="Lock" contentFit="contain" source={lockImage} style={styles.image} />
				</View>

				<View style={styles.copy}>
					<Text style={styles.title}>You need an account to save this game</Text>
					<Text style={styles.description}>
						Log in or create an account. Your game details will be kept while you continue.
					</Text>
				</View>
			</View>

			<View style={styles.actions}>
				<Button title="Log in" onPress={onLogin} />
				<Button title="Create account" onPress={onSignUp} preset="secondary" />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "space-between",
		paddingBottom: spacing[4],
		paddingTop: spacing[16],
	},
	content: {
		alignItems: "center",
		gap: spacing[8],
	},
	imageContainer: {
		alignItems: "center",
		backgroundColor: colors.background.illustration,
		borderRadius: spacing[20],
		height: spacing[32],
		justifyContent: "center",
		overflow: "hidden",
		width: spacing[32],
	},
	image: {
		height: spacing[20],
		transform: [{ scale: 2 }],
		width: spacing[20],
	},
	copy: {
		gap: spacing[3],
	},
	title: {
		color: colors.text.primary,
		textAlign: "center",
		...typography.heading2,
	},
	description: {
		color: colors.text.secondary,
		textAlign: "center",
		...typography.body,
	},
	actions: {
		gap: spacing[2],
	},
});
