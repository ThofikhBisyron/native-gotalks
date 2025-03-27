import { MaterialIcons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { TouchableOpacity, View, Image, Text } from "react-native"



export default function HeaderChat() {
    const router = useRouter()


    return(
        <View className="flex-1 flex-row justify-between items-center bg-[facc15]">
            <TouchableOpacity onPress={() => router.back()} className="p-2">
                <MaterialIcons name="arrow-back" size={24} />
            </TouchableOpacity>
             <View>
                <Image source={{ uri: image }} className="w-20 h-20 rounded-full"/>
                <Text>{name}</Text>
             </View>
            
        </View>
    )

}