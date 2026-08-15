import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextInputField, toast } from "@/components";
import { useLogin } from "@/api/auth/useLogin";
import { useSignup } from "@/api/auth/useSignup";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from "react-native";
import { useState } from "react";

import { LoginFormValues, loginSchema, SignupFormValues, signupSchema } from "../schemas/authSchema";
import { colors, spacing, typography } from "@/theme";
import { router } from "expo-router";

interface AuthScreenProps {
	mode: "login" | "signup";
}

type AuthFormValues = LoginFormValues | SignupFormValues;

export function AuthScreen({ mode }: AuthScreenProps) {
	const isLogin = mode === "login";

	const [formError, setFormError] = useState<string>();

	const loginMutation = useLogin();
	const signupMutation = useSignup();

	const { control, handleSubmit } = useForm<AuthFormValues>({
		resolver: zodResolver(isLogin ? loginSchema : signupSchema),
		defaultValues: {
			email: "",
			password: "",
			...(isLogin ? {} : { displayName: "" }),
		},
	});

	const isPending = loginMutation.isPending || signupMutation.isPending;

	const onSubmit = (values: AuthFormValues) => {
		setFormError(undefined);

		const normalizedEmail = values.email.trim().toLowerCase();

		if (isLogin) {
			loginMutation.mutate(
				{
					email: normalizedEmail,
					password: values.password,
				},
				{
					onSuccess: () => {
						toast.success({
							title: "Welcome back!",
						});
					},
					onError: (error) => {
						setFormError(error.message);
					},
				},
			);

			return;
		}

		const signupValues = values as SignupFormValues;

		signupMutation.mutate(
			{
				email: normalizedEmail,
				password: signupValues.password,
				displayName: signupValues.displayName.trim(),
			},
			{
				onSuccess: () => {
					router.replace("/login");

					toast.success({
						title: "Account created successfully",
					});
				},
				onError: (error) => {
					setFormError(error.message);
				},
			},
		);
	};

	return (
		<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.container}>
			<View style={styles.copy}>
				<Text style={styles.title}>{isLogin ? "Welcome back" : "Create your account"}</Text>

				<Text style={styles.description}>
					{isLogin
						? "Log in to continue saving your game."
						: "Create an account to save and manage your games."}
				</Text>
			</View>

			<View style={styles.form}>
				{!isLogin && (
					<Controller
						control={control}
						name="displayName"
						render={({ field, fieldState }) => (
							<TextInputField
								label="Name"
								value={field.value ?? ""}
								onChangeText={field.onChange}
								error={fieldState.error?.message}
								required
							/>
						)}
					/>
				)}

				<Controller
					control={control}
					name="email"
					render={({ field, fieldState }) => (
						<TextInputField
							autoCapitalize="none"
							autoComplete="email"
							keyboardType="email-address"
							label="Email"
							placeholder="you@example.com"
							required
							value={field.value}
							onChangeText={field.onChange}
							error={fieldState.error?.message}
						/>
					)}
				/>

				<Controller
					control={control}
					name="password"
					render={({ field, fieldState }) => (
						<TextInputField
							autoCapitalize="none"
							autoComplete={isLogin ? "current-password" : "new-password"}
							label="Password"
							placeholder="Enter your password"
							required
							secureTextEntry
							value={field.value}
							onChangeText={field.onChange}
							error={fieldState.error?.message}
						/>
					)}
				/>

				{formError && <Text style={styles.formError}>{formError}</Text>}
			</View>

			<Button
				disabled={isPending}
				title={
					isPending
						? isLogin
							? "Logging in..."
							: "Creating account..."
						: isLogin
							? "Log in"
							: "Create account"
				}
				onPress={handleSubmit(onSubmit)}
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
	formError: {
		color: colors.danger.main,
		...typography.body,
	},
});
