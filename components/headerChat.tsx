import { MaterialIcons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { useState } from "react"
import { TouchableOpacity, View, Image, Text } from "react-native"

interface ChatHeader {
    name: string,
    image: string,
}

export default function HeaderChat({name, image}: ChatHeader) {
    const router = useRouter()

    return(
        <View className="flex-1">
            <View className="flex flex-row justify-between items-center bg-[#1e293b] h-24"> 
                <View className="flex flex-row justify-center items-center gap-3">
                    <TouchableOpacity onPress={() => router.back()} className="p-2">
                        <MaterialIcons name="arrow-back" size={24} color={"#facc15"}/>
                    </TouchableOpacity>
                    <View className="flex flex-row items-center gap-2">
                        <Image source={{ uri: image }} className="w-20 h-20 rounded-full"/>
                        <Text className="text-white text-2xl">{name}</Text>
                    </View>
                </View>
                <TouchableOpacity>
                    <MaterialIcons name="search" size={24} color={"white"}/>
                </TouchableOpacity>
            </View> 
        </View>
    )

}