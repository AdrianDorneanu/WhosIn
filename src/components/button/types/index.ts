export type ButtonPreset = "primary" | "secondary";

export interface ButtonProps {
  title: string;
  onPress: () => void;
  preset?: ButtonPreset;
}
