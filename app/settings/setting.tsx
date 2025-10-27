import HeaderSetting from "@/components/headerSetting";
import { logout } from "@/redux/reducers/auth";
import { deleteProfile } from "@/redux/reducers/profile";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { View, Image, Text, TouchableOpacity, useColorScheme } from "react-native";
import { useDispatch } from "react-redux";
import { useRouter } from "expo-router"
import Toast from "react-native-toast-message"



export default function Setting() {
    const scheme = useColorScheme()
    const iconcolor = scheme === "dark" ? "white" : "black"
    const dispatch = useDispatch()
    const router = useRouter()
    const contact = 
        {
            id: 1, 
            name: "raisya", 
            phone: "62888888888", 
            image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL1D8_YIJm9XpGyo81GbGPIYFGhFrBKhs0TA&s"
        }
    
    const log = async () => {
        Toast.show({
            type : 'general',
            text1 : 'Success',
            text2 : 'Logging out..'
        })
        dispatch(logout())
        dispatch(deleteProfile())
        router.push("../app/login")

    }

    return(
        <View className="flex-1">
            <HeaderSetting/>
            <View className="flex flex-row pl-3 mt-5 gap-3">
                <Image source={{uri : contact.image}} className="w-20 h-20 rounded-full"/>
                <View className="flex gap-2">
                    <Text className="text-xl font-bold text-black dark:text-white">{contact.name}</Text>
                    <Text className="text-xl text-black dark:text-white">{contact.phone}</Text>
                </View>
            </View>
            <View className="flex pl-3 mt-5">
                <TouchableOpacity className="flex flex-row gap-2 items-center">
                    <MaterialIcons name="account-box" size={40} color={iconcolor} />
                    <Text className="text-xl text-black dark:text-white">Account</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex flex-row gap-2 items-center">
                    <MaterialIcons name="privacy-tip" size={40} color={iconcolor} />
                    <Text className="text-xl text-black dark:text-white">Privacy</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex flex-row gap-2 items-center">
                    <MaterialIcons name="circle-notifications" size={40} color={iconcolor} />
                    <Text className="text-xl text-black dark:text-white">Notifications</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex flex-row gap-2 items-center">
                    <MaterialIcons name="light-mode" size={40} color={iconcolor} />
                    <Text className="text-xl text-black dark:text-white">Appearance</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex flex-row gap-2 items-center">
                    <MaterialIcons name="chat" size={40} color={iconcolor} />
                    <Text className="text-xl text-black dark:text-white">Chats</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex flex-row gap-2 items-center">
                    <MaterialIcons name="sd-storage" size={40} color={iconcolor} />
                    <Text className="text-xl text-black dark:text-white">Storage and Data</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex flex-row gap-2 items-center">
                    <MaterialIcons name="help" size={40} color={iconcolor} />
                    <Text className="text-xl text-black dark:text-white">Help</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex flex-row gap-2 items-center">
                    <MaterialIcons name="person-add" size={40} color={iconcolor} />
                    <Text className="text-xl text-black dark:text-white">Invite a Friend</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex flex-row gap-2 items-center" onPress={log}>
                    <MaterialIcons name="logout" size={40} color={iconcolor} />
                    <Text className="text-xl text-black dark:text-white">Log Out</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}