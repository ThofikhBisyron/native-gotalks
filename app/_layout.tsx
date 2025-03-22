import { Stack } from "expo-router";
import Home from "./home";
import "../global.css"


export default function RootLayout() {

  return (
      <Stack screenOptions={{ headerShown: false }} >
        <Stack.Screen name="login" options={{ title : ("welcome") }} />
        <Stack.Screen name="tabs" options={{ headerShown: false }} />
      </Stack>
  );
}