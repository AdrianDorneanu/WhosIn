import { AuthLayout, AuthScreen } from "@/features";

export default function SignUpRoute() {
	return (
		<AuthLayout title="Create account">
			<AuthScreen mode="signup" />
		</AuthLayout>
	);
}
