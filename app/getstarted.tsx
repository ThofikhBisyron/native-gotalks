import { View, Text, TouchableOpacity } from "react-native"
import { useRouter } from "expo-router"
import { MotiText } from "moti";


export default function Getstarted() {
    const route = useRouter()


    return(
    <View className="flex-1 justify-center items-center">
        <MotiText from={{ opacity: 1, scale:0.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: "timing",
          duration: 2000,
        }} className="text-[#facc15] font-bold text-4xl text-center">
        Communicate With Everyone In The World and Know Their Location With GoTalks
        </MotiText>
        <TouchableOpacity className="border-1 bg-slate-300 mt-20 rounded-2xl p-3" onPress={() => route.push("/login")}>         
            <Text className="text-[#facc15] font-bold text-4xl ">Get Started</Text>
        </TouchableOpacity>
    </View>
    )
}