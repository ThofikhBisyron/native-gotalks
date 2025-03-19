import { Stack } from "expo-router";
import { View, useColorScheme } from "react-native";
import "../global.css"

export default function RootLayout() {
  const theme = useColorScheme()
  return (
    <View className={theme === "dark" ? "flex-1 bg-black" : "flex-1 bg-white"}>
      <Stack screenOptions={{ headerShown: false}}/>
    </View>    
  )
}
