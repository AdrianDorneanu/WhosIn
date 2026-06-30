import { Button } from "@/components";
import { spacing } from "@/theme";
import { router } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";

import { ReviewGameStep } from "../components";
import { useCreateGameDraft } from "../context";

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

	return (
		<View style={styles.container}>
			<ReviewGameStep draft={draft} />

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
	footer: {
		paddingBottom: spacing[4],
		paddingTop: spacing[3],
	},
});
