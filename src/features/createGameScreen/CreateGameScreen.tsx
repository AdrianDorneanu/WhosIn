import { spacing } from "@/theme";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { ScrollView, StyleSheet } from "react-native";

import { GameDetailsStep } from "./components";
import { createGameSchema, CreateGameFormValues } from "./schemas";

export function CreateGameScreen() {
	const form = useForm<CreateGameFormValues>({
		defaultValues: {
			sport: "padel",
			title: "",
			date: "",
			time: "",
			location: "",
			maxPlayers: 8,
			cost: "",
			notes: "",
		},
		resolver: zodResolver(createGameSchema),
	});

	return (
		<FormProvider {...form}>
			<ScrollView
				contentContainerStyle={styles.content}
				keyboardShouldPersistTaps="handled"
				showsVerticalScrollIndicator={false}
				style={styles.container}
			>
				<GameDetailsStep />
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
