import { Select } from "@/components";
import { colors, spacing } from "@/theme";
import { faTableTennisPaddleBall } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

export function GameDetailsStep() {
	const [sport, setSport] = useState("padel");
	const sportOptions = [
		{
			label: "Padel",
			value: "padel",
			icon: (
				<View style={styles.sportIcon}>
					<FontAwesomeIcon color={colors.primary.main} icon={faTableTennisPaddleBall} size={18} />
				</View>
			),
		},
		{
			label: "Tennis",
			value: "tennis",
		},
		{
			label: "Football",
			value: "football",
		},
	];
	return (
		<View style={styles.form}>
			<Select
				drawerTitle="Choose a sport"
				label="Sport"
				onValueChange={setSport}
				options={sportOptions}
				searchPlaceholder="Search sports"
				value={sport}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	form: {
		gap: spacing[4],
	},
	sportIcon: {
		alignItems: "center",
		backgroundColor: colors.primary.light,
		borderRadius: spacing[5],
		height: spacing[10],
		justifyContent: "center",
		width: spacing[10],
	},
});
