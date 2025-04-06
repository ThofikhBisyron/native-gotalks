import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { View, TouchableOpacity, Text, Image } from "react-native";


export default function HeaderSetting() {
    const router = useRouter()

    return(
        <View className="">
            <View className="flex flex-row justify-between items-center bg-[#1e293b] h-20">
             <View className="flex flex-row justify-center items-center gap-3">
                <TouchableOpacity onPress={() => router.back()} className="p-2">
                    <MaterialIcons name="arrow-back" size={24} color={"#facc15"}/>
                </TouchableOpacity>
                <Text className="text-2xl font-semibold text-[#facc15]">Settings</Text>
            </View>
            </View>
        </View>
    )
}