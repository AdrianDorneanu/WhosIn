import { useCreateGame } from "@/api";
import { Button, toast } from "@/components";
import { useAuthStore } from "@/stores";
import { spacing } from "@/theme";
import { router } from "expo-router";
import { DateTime } from "luxon";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";

import { ReviewGameStep } from "../components";
import { useCreateGameDraft } from "../context";

export function ReviewGameScreen() {
	const { clearDraft, draft } = useCreateGameDraft();
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

	const currentDraft = draft;

	function handleCreateGame() {
		if (!isAuthenticated) {
			router.push("/account-required");
			return;
		}

		const startsAt = DateTime.fromISO(`${currentDraft.date}T${currentDraft.startTime}`).toUTC().toISO();
		const endsAt = DateTime.fromISO(`${currentDraft.date}T${currentDraft.endTime}`).toUTC().toISO();
		const costMatch = currentDraft.cost.match(/\d+(?:[.,]\d+)?/);

		if (!startsAt || !endsAt || (currentDraft.cost && !costMatch)) {
			toast.error({
				title: "Invalid game details",
				description: "Check the date, time, and cost before creating the game.",
			});
			return;
		}

		createGameMutation.mutate(
			{
				title: currentDraft.title,
				sport: currentDraft.sport,
				startsAt,
				endsAt,
				location: currentDraft.location,
				maxPlayers: currentDraft.maxPlayers,
				costPerPlayer: costMatch ? Number(costMatch[0].replace(",", ".")) : null,
				notes: currentDraft.notes.trim() || null,
			},
			{
				onSuccess: () => {
					clearDraft();
					router.replace("/home");
					toast.success({
						title: "Game created successfully",
					});
				},
				onError: (error) => {
					toast.error({
						title: "Game creation failed",
						description: error.message,
						duration: 8000,
					});
				},
			},
		);
	}

	return (
		<View style={styles.container}>
			<ReviewGameStep draft={draft} />

			<View style={styles.footer}>
				<Button
					disabled={createGameMutation.isPending}
					title={createGameMutation.isPending ? "Creating game..." : "Create game"}
					onPress={handleCreateGame}
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
