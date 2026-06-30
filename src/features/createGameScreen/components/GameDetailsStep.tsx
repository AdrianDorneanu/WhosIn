import { Button, DatePicker, NumberInput, Select, TextInputField, TimePicker } from "@/components";
import { spacing } from "@/theme";
import { router } from "expo-router";
import { Controller, useFormContext } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { CreateGameFormValues } from "../schemas";

export function GameDetailsStep() {
	const { control, handleSubmit } = useFormContext<CreateGameFormValues>();

	const sportOptions = [
		{
			label: "Padel",
			value: "padel",
		},
		{
			label: "Tennis",
			value: "tennis",
		},
		{
			label: "Football",
			value: "football",
		},
		{
			label: "Other",
			value: "other",
		},
	];

	function handleContinue(values: CreateGameFormValues) {
		router.push("/review-game");
	}

	return (
		<View style={styles.form}>
			<Controller
				control={control}
				name="sport"
				render={({ field, fieldState }) => (
					<Select
						drawerTitle="Choose a sport"
						error={fieldState.error?.message}
						label="Sport"
						onValueChange={field.onChange}
						options={sportOptions}
						required
						searchPlaceholder="Search sports"
						value={field.value}
					/>
				)}
			/>

			<Controller
				control={control}
				name="title"
				render={({ field, fieldState }) => (
					<TextInputField
						error={fieldState.error?.message}
						label="Title"
						onChangeText={field.onChange}
						placeholder="Saturday Padel"
						required
						value={field.value}
					/>
				)}
			/>

			<Controller
				control={control}
				name="date"
				render={({ field, fieldState }) => (
					<DatePicker
						drawerTitle="Choose a date"
						error={fieldState.error?.message}
						label="Date"
						onValueChange={field.onChange}
						required
						value={field.value}
					/>
				)}
			/>

			<Controller
				control={control}
				name="time"
				render={({ field, fieldState }) => (
					<TimePicker
						drawerTitle="Choose a time"
						error={fieldState.error?.message}
						label="Time"
						onValueChange={field.onChange}
						required
						value={field.value}
					/>
				)}
			/>

			<Controller
				control={control}
				name="location"
				render={({ field, fieldState }) => (
					<TextInputField
						error={fieldState.error?.message}
						label="Location"
						onChangeText={field.onChange}
						placeholder="Ace Padel Club"
						required
						value={field.value}
					/>
				)}
			/>

			<Controller
				control={control}
				name="maxPlayers"
				render={({ field, fieldState }) => (
					<NumberInput
						error={fieldState.error?.message}
						label="Max players"
						min={2}
						onValueChange={field.onChange}
						required
						value={field.value}
					/>
				)}
			/>

			<Controller
				control={control}
				name="cost"
				render={({ field, fieldState }) => (
					<TextInputField
						error={fieldState.error?.message}
						label="Cost (optional)"
						onChangeText={field.onChange}
						placeholder="AED 50 / player"
						value={field.value}
					/>
				)}
			/>

			<Controller
				control={control}
				name="notes"
				render={({ field, fieldState }) => (
					<TextInputField
						error={fieldState.error?.message}
						label="Notes (optional)"
						multiline
						onChangeText={field.onChange}
						placeholder="Bring your own racket."
						value={field.value}
					/>
				)}
			/>

			<Button title="Continue" onPress={handleSubmit(handleContinue)} />
		</View>
	);
}

const styles = StyleSheet.create({
	form: {
		gap: spacing[4],
	},
});
