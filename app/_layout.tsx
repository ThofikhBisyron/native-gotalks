import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import "../global.css"


export default function RootLayout() {

  return (
    <PaperProvider>
      <Stack screenOptions={{ headerShown: false }} >
      <Stack.Screen name="tabs" options={{ title: ("GoTalks") }} />
      </Stack>
    </PaperProvider>
  );
}