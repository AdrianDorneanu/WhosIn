import { AuthLayout, AuthScreen } from "@/features";

export default function LoginRoute() {
	return (
		<AuthLayout title="Log in">
			<AuthScreen mode="login" />
		</AuthLayout>
	);
}
