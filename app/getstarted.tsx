import { View, Text, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import { MotiView, MotiText } from "moti";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";

export default function Getstarted() {
  const router = useRouter();
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    if (token) {
      const timeout = setTimeout(() => {
        router.replace("/tabs/home");
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [token]);

  return (
    <View className="flex-1 justify-center items-center px-6">
      <StatusBar style="light" />

      <MotiView
        from={{ translateY: -10, opacity: 0 }}
        animate={{ translateY: 0, opacity: 1 }}
        transition={{ type: "timing", duration: 1500 }}
        className="items-center"
      >
        <Image
          className="w-52 h-52"
          source={require("../assets/gif/people talking.gif")}
          resizeMode="contain"
        />
      </MotiView>

      <MotiText
        from={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "timing", duration: 2000 }}
        className="text-yellow-400 font-extrabold text-4xl text-center mt-6"
      >
        Communicate Freely
      </MotiText>

      <MotiText
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 800, duration: 1200 }}
        className="text-gray-300 text-lg text-center mt-2 px-4"
      >
        Connect with everyone in the world using nothing but your email.
      </MotiText>

      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 1500, duration: 800 }}
      >
        <TouchableOpacity
          className="mt-16 bg-yellow-400 px-10 py-4 rounded-2xl shadow-lg shadow-yellow-600/40"
          onPress={() => router.push("/login")}
        >
          <Text className="text-black font-bold text-2xl">Get Started</Text>
        </TouchableOpacity>
      </MotiView>
    </View>
  );
}
