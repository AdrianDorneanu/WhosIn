export interface NumberInputProps {
	label: string;
	value: number;
	min?: number;
	max?: number;
	step?: number;
	error?: string;
	required?: boolean;
	onValueChange: (value: number) => void;
}
