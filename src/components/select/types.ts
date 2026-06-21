import { ReactNode } from "react";

export interface SelectOption {
	label: string;
	value: string;
	icon?: ReactNode;
}

export interface SelectProps {
	label: string;
	options: SelectOption[];
	value?: string;
	placeholder?: string;
	drawerTitle?: string;
	searchPlaceholder?: string;
	onValueChange: (value: string) => void;
}
