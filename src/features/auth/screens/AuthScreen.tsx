import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextInputField, TextLink, toast } from "@/components";
import { useLogin } from "@/api/auth/useLogin";
import { useSignup } from "@/api/auth/useSignup";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from "react-native";

import { LoginFormValues, loginSchema, SignupFormValues, signupSchema } from "../schemas/authSchema";
import { spacing, typography } from "@/theme";
import { router } from "expo-router";

interface AuthScreenProps {
	mode: "login" | "signup";
	returnTo?: "/review-game";
}

type AuthFormValues = LoginFormValues | SignupFormValues;

export function AuthScreen({ mode, returnTo }: AuthScreenProps) {
	const isLogin = mode === "login";

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
		toast.hide();

		const normalizedEmail = values.email.trim().toLowerCase();

		if (isLogin) {
			loginMutation.mutate(
				{
					email: normalizedEmail,
					password: values.password,
				},
				{
					onSuccess: () => {
						router.replace(returnTo ?? "/home");

						toast.success({
							title: "Welcome back!",
						});
					},
					onError: (error) => {
						toast.error({
							description: error.message,
							duration: 8000,
							title: "Login failed",
						});
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
					router.replace({
						pathname: "/login",
						params: returnTo ? { returnTo } : {},
					});

					toast.success({
						title: "Account created successfully",
					});
				},
				onError: (error) => {
					toast.error({
						description: error.message,
						duration: 8000,
						title: "Account creation failed",
					});
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
						? returnTo
							? "Log in to continue saving your game."
							: "Log in to view and manage your games."
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
			{!isLogin ? (
				<TextLink
					label="Log in"
					onPress={() =>
						router.push({
							pathname: "/login",
							params: returnTo ? { returnTo } : {},
						})
					}
					prompt="Already have an account?"
				/>
			) : null}
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
