import { useGames } from "@/api";
import { Button, toast } from "@/components";
import { colors, spacing, typography } from "@/theme";
import { faLink, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { router } from "expo-router";
import { ActivityIndicator, FlatList, Pressable, RefreshControl, StyleSheet, Text, View } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";

import { EmptyGamesArtwork } from "../components/EmptyGamesArtwork";
import { GameCard } from "../components/GameCard";

export function HomeScreen() {
	const { data: games, isPending, isError, error, isRefetching, refetch } = useGames();
	const hasGames = Boolean(games?.length);

	function handleJoin() {
		toast.info({
			title: "Joining by link is not available yet",
			description: "The invite flow is still being built.",
		});
	}

	const actions = (
		<View style={styles.actions}>
			{!hasGames ? (
				<Button
					title="Create your first game"
					icon={
						<Svg width={18} height={18} viewBox="0 0 24 24" accessible={false}>
							<Circle
								cx={12}
								cy={12}
								r={9}
								fill="none"
								stroke={colors.primary.contrast}
								strokeWidth={1.5}
							/>
							<Path
								d="M12 8V16M8 12H16"
								fill="none"
								stroke={colors.primary.contrast}
								strokeWidth={1.5}
								strokeLinecap="round"
							/>
						</Svg>
					}
					onPress={() => router.push("/create-game")}
				/>
			) : null}
			<Button
				title="Join with a link"
				icon={<FontAwesomeIcon icon={faLink} color={colors.secondary.contrast} size={18} />}
				preset="secondary"
				variant="outline"
				onPress={handleJoin}
			/>
		</View>
	);

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text accessibilityRole="header" style={styles.heading}>
					Home
				</Text>
				<Pressable
					accessibilityLabel="View profile"
					accessibilityRole="button"
					onPress={() => router.push("/profile")}
					style={({ pressed }) => [styles.avatar, pressed && styles.pressed]}
				>
					<FontAwesomeIcon icon={faUser} color={colors.primary.dark} size={20} />
				</Pressable>
			</View>

			<FlatList
				data={games}
				keyExtractor={(game) => game.publicId}
				renderItem={({ item }) => <GameCard game={item} />}
				contentContainerStyle={styles.content}
				showsVerticalScrollIndicator={false}
				refreshControl={
					<RefreshControl
						refreshing={isRefetching}
						onRefresh={() => void refetch()}
						tintColor={colors.primary.main}
					/>
				}
				ListHeaderComponent={
					isError ? (
						<View accessibilityRole="alert" style={styles.error}>
							<Text style={styles.errorTitle}>Couldn&apos;t load games</Text>
							<Text style={styles.description}>{error.message}</Text>
							<Button
								title="Try again"
								preset="secondary"
								variant="outline"
								onPress={() => void refetch()}
								disabled={isRefetching}
							/>
						</View>
					) : hasGames ? (
						<Text accessibilityRole="header" style={styles.sectionTitle}>
							Upcoming games
						</Text>
					) : undefined
				}
				ListEmptyComponent={
					isPending ? (
						<View style={styles.centered}>
							<ActivityIndicator
								accessibilityLabel="Loading games"
								color={colors.primary.main}
								size="large"
							/>
							<Text style={styles.description}>Loading games...</Text>
						</View>
					) : !isError ? (
						<View style={styles.empty}>
							<View style={styles.artwork}>
								<EmptyGamesArtwork />
							</View>
							<View style={styles.message}>
								<Text accessibilityRole="header" style={styles.emptyTitle}>
									No games yet
								</Text>
								<Text style={styles.description}>
									No games are available yet. Get started by creating a game or joining with a link.
								</Text>
							</View>
							{actions}
						</View>
					) : undefined
				}
				ListFooterComponent={hasGames ? actions : undefined}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "space-between",
		paddingVertical: spacing[4],
	},
	heading: {
		color: colors.text.primary,
		...typography.heading2,
	},
	avatar: {
		alignItems: "center",
		backgroundColor: colors.primary.light,
		borderRadius: spacing[6],
		height: spacing[12],
		justifyContent: "center",
		width: spacing[12],
	},
	pressed: {
		opacity: 0.7,
	},
	content: {
		flexGrow: 1,
		gap: spacing[4],
		paddingBottom: spacing[6],
	},
	centered: {
		alignItems: "center",
		flex: 1,
		gap: spacing[4],
		justifyContent: "center",
		paddingVertical: spacing[12],
	},
	empty: {
		alignItems: "center",
		flex: 1,
		gap: spacing[6],
		justifyContent: "center",
		paddingVertical: spacing[6],
	},
	artwork: {
		maxWidth: 300,
		width: "100%",
	},
	message: {
		alignItems: "center",
		gap: spacing[2],
		maxWidth: 320,
	},
	emptyTitle: {
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
		gap: spacing[3],
		width: "100%",
	},
	sectionTitle: {
		color: colors.text.primary,
		...typography.heading3,
	},
	error: {
		backgroundColor: colors.danger.light,
		borderRadius: spacing[3],
		gap: spacing[3],
		padding: spacing[4],
	},
	errorTitle: {
		color: colors.danger.main,
		textAlign: "center",
		...typography.bodyMedium,
	},
});
