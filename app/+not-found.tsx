import { ThemedText } from "@/components/ThemedText";
import { Stack } from "expo-router";

export function NotFound() {
    return (
        <>
            <Stack.Screen options={{ title: "Oops! This screen doesn't exist." }} />
            <ThemedText>Not found!</ThemedText>
        </>
    );
}