import { Stack } from "expo-router"
import { PaperProvider } from "react-native-paper"
import "../global.css";
import { View, useColorScheme } from "react-native"
import { Provider } from "react-redux"
import { PersistGate} from "redux-persist/integration/react"
import { store, persistor } from "../redux/store"
import Toast from 'react-native-toast-message';
import { toastConfig } from '../components/toastConfig';
import { Slot } from "expo-router";


export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider>
            <View className={`flex-1 ${colorScheme === "dark" ? "bg-black" : "bg-white"}`}>
                <Stack
                  screenOptions={{
                    headerShown: false,
                    contentStyle: { backgroundColor: "transparent" },
                  }}
                  />
            </View>
            <Toast config={toastConfig} />
        </PaperProvider>
       </PersistGate>
    </Provider>
  );
}
