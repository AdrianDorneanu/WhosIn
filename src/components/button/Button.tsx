import { spacing, typography } from "@/theme";
import { Pressable, Text, StyleSheet } from "react-native";

import { ButtonProps } from "./types";
import { getPreset } from "./utils";

export function Button({ title, onPress, preset = "primary" }: ButtonProps) {
  const presetStyles = getPreset(preset);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        presetStyles.button,
        pressed && presetStyles.pressedButton,
      ]}
      onPress={onPress}
    >
      <Text style={[styles.text, presetStyles.text]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    borderRadius: spacing[2],
    justifyContent: "center",
    minHeight: spacing[12],
    paddingHorizontal: spacing[4],
    width: "100%",
  },
  text: {
    textAlign: "center",
    ...typography.button,
  },
});
