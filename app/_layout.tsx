import GameProvider from "@/providers/gameProvider";
import { Stack } from "expo-router";

export default function RootLayout() {
    return (
        <GameProvider>
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
            </Stack>
        </GameProvider>
    );
}
