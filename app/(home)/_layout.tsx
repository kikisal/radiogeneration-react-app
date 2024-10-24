import { Stack, Tabs } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeLayout() {
  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name="index"></Stack.Screen>
    </Stack>
  );
}
