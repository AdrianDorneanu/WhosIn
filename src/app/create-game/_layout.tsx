import { ScreenLayout } from "@/components";
import { Slot } from "expo-router";

export default function CreateGameLayout() {
  return (
    <ScreenLayout>
      <Slot />
    </ScreenLayout>
  );
}
