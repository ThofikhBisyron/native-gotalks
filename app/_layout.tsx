import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import "../global.css";
import { View, useColorScheme } from "react-native";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <PaperProvider>
      <View className={`flex-1 ${colorScheme === "dark" ? "bg-black" : "bg-white"}`}>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "transparent" },
          }}
        />
      </View>
    </PaperProvider>
  );
}
