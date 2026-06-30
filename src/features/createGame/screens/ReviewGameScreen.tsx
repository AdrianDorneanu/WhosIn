import { Button } from "@/components";
import { colors, spacing, typography } from "@/theme";
import {
	faCalendarDays,
	faClipboard,
	faClock,
	faCoins,
	faLink,
	faLocationDot,
	faPenToSquare,
	faPeopleGroup,
	faTableTennisPaddleBall,
	faUserCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { router } from "expo-router";
import { DateTime } from "luxon";
import { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { useCreateGameDraft } from "../context";

const sportLabels: Record<string, string> = {
	football: "Football",
	other: "Other",
	padel: "Padel",
	tennis: "Tennis",
};

function formatDate(value: string) {
	return DateTime.fromISO(value).toFormat("ccc, LLL d, yyyy");
}

function formatTime(value: string) {
	return DateTime.fromFormat(value, "HH:mm").toFormat("h:mm a");
}

export function ReviewGameScreen() {
	const { draft } = useCreateGameDraft();

	useEffect(() => {
		if (!draft) {
			router.replace("/create-game");
		}
	}, [draft]);

	if (!draft) {
		return null;
	}

	const sportLabel = sportLabels[draft.sport] ?? draft.sport;
	const timeRange = `${formatTime(draft.startTime)} - ${formatTime(draft.endTime)}`;

	return (
		<View style={styles.container}>
			<ScrollView
				contentContainerStyle={styles.content}
				showsVerticalScrollIndicator={false}
				style={styles.scroll}
			>
				<View style={styles.card}>
					<View style={styles.header}>
						<View style={styles.sportIcon}>
							<FontAwesomeIcon color={colors.primary.contrast} icon={faTableTennisPaddleBall} size={22} />
						</View>

						<View style={styles.titleContainer}>
							<Text style={styles.title}>{draft.title}</Text>
							<Text style={styles.subtitle}>{sportLabel}</Text>
						</View>
					</View>

					<View style={styles.divider} />

					<View style={styles.details}>
						<View style={styles.detailRow}>
							<FontAwesomeIcon color={colors.text.muted} icon={faCalendarDays} size={16} />
							<Text style={styles.detailText}>{formatDate(draft.date)}</Text>
						</View>

						<View style={styles.detailRow}>
							<FontAwesomeIcon color={colors.text.muted} icon={faClock} size={16} />
							<Text style={styles.detailText}>{timeRange}</Text>
						</View>

						<View style={styles.detailRow}>
							<FontAwesomeIcon color={colors.text.muted} icon={faLocationDot} size={16} />
							<Text style={styles.detailText}>{draft.location}</Text>
						</View>

						<View style={styles.detailRow}>
							<FontAwesomeIcon color={colors.text.muted} icon={faPeopleGroup} size={16} />
							<Text style={styles.detailText}>{draft.maxPlayers} players</Text>
						</View>

						{draft.cost ? (
							<View style={styles.detailRow}>
								<FontAwesomeIcon color={colors.green[500]} icon={faCoins} size={16} />
								<Text style={styles.detailText}>{draft.cost}</Text>
							</View>
						) : null}

						{draft.notes ? (
							<View style={styles.detailRow}>
								<FontAwesomeIcon color={colors.text.muted} icon={faClipboard} size={16} />
								<Text style={styles.detailText}>{draft.notes}</Text>
							</View>
						) : null}
					</View>
				</View>

				<View style={styles.nextSteps}>
					<Text style={styles.sectionTitle}>What happens next</Text>

					<View style={styles.nextStepRow}>
						<FontAwesomeIcon color={colors.primary.main} icon={faLink} size={15} />
						<Text style={styles.nextStepText}>You get a shareable invite link for players.</Text>
					</View>

					<View style={styles.nextStepRow}>
						<FontAwesomeIcon color={colors.primary.main} icon={faUserCheck} size={15} />
						<Text style={styles.nextStepText}>Players can confirm their spot from the invite.</Text>
					</View>

					<View style={styles.nextStepRow}>
						<FontAwesomeIcon color={colors.primary.main} icon={faPenToSquare} size={15} />
						<Text style={styles.nextStepText}>You can update the game details later.</Text>
					</View>
				</View>
			</ScrollView>

			<View style={styles.footer}>
				<Button title="Create game" onPress={() => null} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	scroll: {
		flex: 1,
	},
	content: {
		gap: spacing[4],
		paddingBottom: spacing[6],
	},
	card: {
		backgroundColor: colors.background.card,
		borderColor: colors.border.default,
		borderRadius: spacing[4],
		borderWidth: 1,
		padding: spacing[4],
	},
	header: {
		alignItems: "center",
		flexDirection: "row",
		gap: spacing[3],
	},
	sportIcon: {
		alignItems: "center",
		backgroundColor: colors.primary.main,
		borderRadius: spacing[8],
		height: spacing[12],
		justifyContent: "center",
		width: spacing[12],
	},
	titleContainer: {
		flex: 1,
	},
	title: {
		color: colors.text.primary,
		...typography.bodyMedium,
	},
	subtitle: {
		color: colors.text.secondary,
		...typography.caption,
	},
	divider: {
		backgroundColor: colors.border.default,
		height: 1,
		marginVertical: spacing[4],
	},
	details: {
		gap: spacing[3],
	},
	detailRow: {
		alignItems: "center",
		flexDirection: "row",
		gap: spacing[3],
	},
	detailText: {
		color: colors.text.primary,
		flex: 1,
		...typography.bodyMedium,
	},
	nextSteps: {
		backgroundColor: colors.background.muted,
		borderRadius: spacing[4],
		gap: spacing[3],
		padding: spacing[4],
	},
	sectionTitle: {
		color: colors.text.primary,
		...typography.bodyMedium,
	},
	nextStepRow: {
		alignItems: "center",
		flexDirection: "row",
		gap: spacing[3],
	},
	nextStepText: {
		color: colors.text.secondary,
		flex: 1,
		...typography.caption,
	},
	footer: {
		paddingBottom: spacing[4],
		paddingTop: spacing[3],
	},
});
