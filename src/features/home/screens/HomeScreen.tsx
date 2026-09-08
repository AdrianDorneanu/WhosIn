import { useGames } from "@/api";
import { Button } from "@/components";
import { colors, spacing, typography } from "@/theme";
import { router } from "expo-router";
import { DateTime } from "luxon";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export function HomeScreen() {
	const gamesQuery = useGames();

	return (
		<ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
			<View style={styles.header}>
				<View style={styles.copy}>
					<Text style={styles.title}>Your games</Text>
					<Text style={styles.description}>Create a new game or manage the ones you organized.</Text>
				</View>

				<Button title="Create a game" onPress={() => router.push("/create-game")} />
			</View>

			{gamesQuery.isPending ? <Text style={styles.message}>Loading games...</Text> : null}

			{gamesQuery.isError ? (
				<View style={styles.messageContainer}>
					<Text style={styles.message}>We could not load your games.</Text>
					<Button title="Try again" onPress={() => void gamesQuery.refetch()} preset="secondary" />
				</View>
			) : null}

			{gamesQuery.data?.length === 0 ? (
				<Text style={styles.message}>You have not created any games yet.</Text>
			) : null}

			<View style={styles.games}>
				{gamesQuery.data?.map((game) => (
					<View key={game.publicId} style={styles.card}>
						<Text style={styles.gameTitle}>{game.title}</Text>
						<Text style={styles.gameMeta}>
							{DateTime.fromISO(game.startsAt).toFormat("ccc, LLL d · h:mm a")}
						</Text>
						<Text style={styles.gameMeta}>{game.location}</Text>
					</View>
				))}
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	content: {
		gap: spacing[6],
		paddingBottom: spacing[8],
		paddingHorizontal: spacing[6],
		paddingTop: spacing[8],
	},
	header: {
		gap: spacing[6],
	},
	copy: {
		gap: spacing[2],
	},
	title: {
		color: colors.text.primary,
		...typography.heading1,
	},
	description: {
		color: colors.text.secondary,
		...typography.body,
	},
	messageContainer: {
		gap: spacing[4],
	},
	message: {
		color: colors.text.secondary,
		textAlign: "center",
		...typography.body,
	},
	games: {
		gap: spacing[3],
	},
	card: {
		backgroundColor: colors.background.card,
		borderColor: colors.border.default,
		borderRadius: spacing[4],
		borderWidth: 1,
		gap: spacing[1],
		padding: spacing[4],
	},
	gameTitle: {
		color: colors.text.primary,
		...typography.bodyMedium,
	},
	gameMeta: {
		color: colors.text.secondary,
		...typography.caption,
	},
});
