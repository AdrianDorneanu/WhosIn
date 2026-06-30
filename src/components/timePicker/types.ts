export interface TimePickerProps {
	label: string;
	value?: string;
	placeholder?: string;
	drawerTitle?: string;
	error?: string;
	required?: boolean;
	onValueChange: (value: string) => void;
}
