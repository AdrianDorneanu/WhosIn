import { colors } from "@/theme";
import { StyleSheet } from "react-native";

import { ButtonPreset } from "../types";

export function getPreset(preset: ButtonPreset) {
  switch (preset) {
    case "secondary":
      return {
        button: styles.secondaryButton,
        pressedButton: styles.secondaryPressedButton,
        text: styles.secondaryText,
      };
    case "primary":
    default:
      return {
        button: styles.primaryButton,
        pressedButton: styles.primaryPressedButton,
        text: styles.primaryText,
      };
  }
}

const styles = StyleSheet.create({
  primaryButton: {
    backgroundColor: colors.primary.main,
  },
  primaryPressedButton: {
    backgroundColor: colors.primary.pressed,
  },
  primaryText: {
    color: colors.primary.contrast,
  },
  secondaryButton: {
    backgroundColor: colors.secondary.main,
    borderColor: colors.secondary.border,
    borderWidth: 1,
  },
  secondaryPressedButton: {
    backgroundColor: colors.secondary.pressed,
  },
  secondaryText: {
    color: colors.secondary.contrast,
  },
});
