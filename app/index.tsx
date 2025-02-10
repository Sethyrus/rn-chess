import { View, Text, StatusBar } from "react-native";
import React from "react";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
    return (
        <SafeAreaView>
            <StatusBar backgroundColor={"#fff"} barStyle={"dark-content"} />
            <ThemedView>
                <ThemedText>index</ThemedText>
            </ThemedView>
        </SafeAreaView>
    );
}
