import { TextInputProps } from "react-native";

export interface TextInputFieldProps
	extends Pick<
		TextInputProps,
		"autoCapitalize" | "autoComplete" | "keyboardType" | "multiline" | "returnKeyType" | "secureTextEntry"
	> {
	label: string;
	value: string;
	placeholder?: string;
	error?: string;
	required?: boolean;
	onChangeText: (value: string) => void;
}
