import { useCreateGame } from "@/api/games";
import { Button, toast } from "@/components";
import { useAuthStore } from "@/stores";
import { spacing } from "@/theme";
import { router } from "expo-router";
import { DateTime } from "luxon";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";

import { ReviewGameStep } from "../components";
import { useCreateGameDraft } from "../context";
import { createGameSchema } from "../schemas";

export function ReviewGameScreen() {
	const { draft } = useCreateGameDraft();
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
	const createGameMutation = useCreateGame();

	useEffect(() => {
		if (!draft) {
			router.replace("/create-game");
		}
	}, [draft]);

	if (!draft) {
		return null;
	}

	const handleCreateGame = () => {
		if (!isAuthenticated) {
			router.push("/account-required");
			return;
		}

		const result = createGameSchema.safeParse(draft);

		if (!result.success) {
			toast.error({
				title: "Check your game details",
				description: result.error.issues[0]?.message,
			});
			return;
		}

		const values = result.data;
		const startsAt = DateTime.fromISO(`${values.date}T${values.startTime}`).toUTC().toISO();
		const endsAt = DateTime.fromISO(`${values.date}T${values.endTime}`).toUTC().toISO();

		if (!startsAt || !endsAt) {
			toast.error({
				title: "Check your game details",
				description: "Choose a valid date and time.",
			});
			return;
		}

		createGameMutation.mutate(
			{
				title: values.title,
				sport: values.sport,
				startsAt,
				endsAt,
				location: values.location,
				maxPlayers: values.maxPlayers,
				costPerPlayer: values.cost.trim() ? Number(values.cost) : null,
				notes: values.notes.trim() || null,
			},
			{
				onSuccess: () => {
					router.dismissTo("/home");
					toast.success({ title: "Game created!" });
				},
				onError: (error) => {
					toast.error({
						title: "Couldn't create game",
						description: error.message,
						duration: 8000,
					});
				},
			},
		);
	};

	return (
		<View style={styles.container}>
			<ReviewGameStep draft={draft} />

			<View style={styles.footer}>
				<Button
					title={createGameMutation.isPending ? "Creating game..." : "Create game"}
					onPress={handleCreateGame}
					disabled={createGameMutation.isPending}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	footer: {
		paddingBottom: spacing[4],
		paddingTop: spacing[3],
	},
});
