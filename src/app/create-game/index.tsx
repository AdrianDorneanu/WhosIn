import { ScreenHeader } from "@/components";
import { spacing } from "@/theme";
import { StyleSheet, Text, View } from "react-native";

export default function CreateGameRoute() {
  return (
    <View style={styles.container}>
      <ScreenHeader title="Create a game" />
      <Text>Create game route</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: spacing[6],
  },
});
