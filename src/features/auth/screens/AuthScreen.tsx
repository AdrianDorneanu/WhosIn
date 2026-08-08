import { Button, TextInputField } from "@/components";
import { spacing, typography } from "@/theme";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from "react-native";

interface AuthScreenProps {
	mode: "login" | "signup";
}

export function AuthScreen({ mode }: AuthScreenProps) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string>();
	const isLogin = mode === "login";

	function handleContinue() {
		const normalizedEmail = email.trim().toLowerCase();

		if (!normalizedEmail || !password) {
			setError("Enter your email and password.");

			return;
		}

		setError("Authentication will be connected to the API.");
	}

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : undefined}
			style={styles.container}
		>
			<View style={styles.copy}>
				<Text style={styles.title}>{isLogin ? "Welcome back" : "Create your account"}</Text>
				<Text style={styles.description}>
					{isLogin
						? "Log in to continue saving your game."
						: "Create an account to save and manage your games."}
				</Text>
			</View>

			<View style={styles.form}>
				<TextInputField
					autoCapitalize="none"
					autoComplete="email"
					error={error}
					keyboardType="email-address"
					label="Email"
					onChangeText={(value) => {
						setEmail(value);
						setError(undefined);
					}}
					placeholder="you@example.com"
					required
					value={email}
				/>
				<TextInputField
					autoCapitalize="none"
					autoComplete={isLogin ? "current-password" : "new-password"}
					label="Password"
					onChangeText={(value) => {
						setPassword(value);
						setError(undefined);
					}}
					placeholder="Enter your password"
					required
					secureTextEntry
					value={password}
				/>
			</View>

			<Button
				title={isLogin ? "Log in and continue" : "Create account and continue"}
				onPress={handleContinue}
			/>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: spacing[8],
		paddingTop: spacing[8],
	},
	copy: {
		gap: spacing[2],
	},
	title: {
		textAlign: "center",
		...typography.heading2,
	},
	description: {
		textAlign: "center",
		...typography.body,
	},
	form: {
		gap: spacing[4],
	},
});
