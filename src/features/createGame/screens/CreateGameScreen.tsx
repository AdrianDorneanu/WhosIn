import { spacing } from "@/theme";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { FormProvider, useForm } from "react-hook-form";
import { ScrollView, StyleSheet } from "react-native";

import { GameDetailsStep } from "../components";
import { useCreateGameDraft } from "../context";
import { CreateGameFormValues, createGameSchema } from "../schemas";

export function CreateGameScreen() {
	const { setDraft } = useCreateGameDraft();
	const form = useForm<CreateGameFormValues>({
		defaultValues: {
			sport: "padel",
			title: "",
			date: "",
			startTime: "",
			endTime: "",
			location: "",
			maxPlayers: 8,
			cost: "",
			notes: "",
		},
		resolver: zodResolver(createGameSchema),
	});

	function handleContinue(values: CreateGameFormValues) {
		setDraft(values);
		router.push("/review-game");
	}

	return (
		<FormProvider {...form}>
			<ScrollView
				contentContainerStyle={styles.content}
				keyboardShouldPersistTaps="handled"
				showsVerticalScrollIndicator={false}
				style={styles.container}
			>
				<GameDetailsStep onContinue={form.handleSubmit(handleContinue)} />
			</ScrollView>
		</FormProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	content: {
		paddingBottom: spacing[8],
	},
});
