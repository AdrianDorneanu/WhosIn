import { GameResponse, GameStatus } from "@/api";
import { colors, spacing, typography } from "@/theme";
import { faCalendarDays, faLocationDot, faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { DateTime } from "luxon";
import { StyleSheet, Text, View } from "react-native";

const statusLabels: Record<GameStatus, string> = {
	UPCOMING: "Upcoming",
	COMPLETED: "Completed",
	CANCELLED: "Cancelled",
};

interface GameCardProps {
	game: GameResponse;
}

export function GameCard({ game }: GameCardProps) {
	return (
		<View style={styles.card}>
			<View style={styles.header}>
				<Text style={styles.sport}>{game.sport}</Text>
				<View style={[styles.status, styles[game.status]]}>
					<Text style={styles.statusText}>{statusLabels[game.status]}</Text>
				</View>
			</View>
			<Text style={styles.title}>{game.title}</Text>
			<View style={styles.detail}>
				<FontAwesomeIcon icon={faCalendarDays} color={colors.text.muted} size={16} />
				<Text style={styles.detailText}>
					{DateTime.fromISO(game.startsAt).toFormat("ccc, LLL d 'at' h:mm a")}
					{" - "}
					{DateTime.fromISO(game.endsAt).toFormat("h:mm a")}
				</Text>
			</View>
			<View style={styles.detail}>
				<FontAwesomeIcon icon={faLocationDot} color={colors.text.muted} size={16} />
				<Text style={styles.detailText}>{game.location}</Text>
			</View>
			<View style={styles.footer}>
				<View style={styles.capacity}>
					<FontAwesomeIcon icon={faPeopleGroup} color={colors.text.muted} size={16} />
					<Text style={styles.caption}>Up to {game.maxPlayers} players</Text>
				</View>
				<Text style={[styles.caption, styles.organizer]}>By {game.organizerName}</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		backgroundColor: colors.background.card,
		borderColor: colors.border.default,
		borderRadius: spacing[4],
		borderWidth: 1,
		gap: spacing[3],
		padding: spacing[4],
	},
	header: {
		alignItems: "center",
		flexDirection: "row",
		gap: spacing[2],
		justifyContent: "space-between",
	},
	sport: {
		color: colors.primary.dark,
		flex: 1,
		textTransform: "capitalize",
		...typography.caption,
	},
	status: {
		borderRadius: spacing[4],
		paddingHorizontal: spacing[2],
		paddingVertical: spacing[1],
	},
	UPCOMING: {
		backgroundColor: colors.primary.light,
	},
	COMPLETED: {
		backgroundColor: colors.background.muted,
	},
	CANCELLED: {
		backgroundColor: colors.danger.light,
	},
	statusText: {
		color: colors.text.secondary,
		...typography.caption,
	},
	title: {
		color: colors.text.primary,
		...typography.heading3,
	},
	detail: {
		alignItems: "center",
		flexDirection: "row",
		gap: spacing[3],
	},
	detailText: {
		color: colors.text.secondary,
		flex: 1,
		...typography.body,
	},
	footer: {
		alignItems: "center",
		borderTopColor: colors.border.default,
		borderTopWidth: StyleSheet.hairlineWidth,
		flexDirection: "row",
		flexWrap: "wrap",
		gap: spacing[2],
		justifyContent: "space-between",
		paddingTop: spacing[3],
	},
	capacity: {
		alignItems: "center",
		flexDirection: "row",
		gap: spacing[2],
	},
	caption: {
		color: colors.text.muted,
		...typography.caption,
	},
	organizer: {
		flexShrink: 1,
	},
});
