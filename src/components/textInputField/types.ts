import { TextInputProps } from "react-native";

export interface TextInputFieldProps extends Pick<TextInputProps, "keyboardType" | "multiline" | "returnKeyType"> {
	label: string;
	value: string;
	placeholder?: string;
	error?: string;
	required?: boolean;
	onChangeText: (value: string) => void;
}
