import { View, Text, TextInput, TouchableOpacity } from "react-native"
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Toast from "react-native-toast-message";
import { useEffect, useState } from "react";
import { useInternalTheme } from "react-native-paper/lib/typescript/core/theming";
import { setProfile } from "@/redux/reducers/profile";
import { ActivityIndicator } from "react-native";


export default function EditUsername() {
    const token = useSelector((state : RootState) => state.auth.token)!
    const profile = useSelector((state: RootState) => state.profile.data)!
    const [loading, setLoading] = useState(false)
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    const router = useRouter()
    const [username, Setusername] = useState("")!
    const dispatch = useDispatch()


    const editUsername = async () => {
        if (!username) {
            Toast.show({
                type:'general',
                text1:'warning',
                text2:'Please enter your username'
            })
            return
        }
        setLoading(true)
        try{
            const response = await fetch(`${apiUrl}/user/update-username`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization : "Bearer " + token 
                },
                body: JSON.stringify({ username })
            })
            if (response.ok){
                try{
                    const responseProfile = await fetch(`${apiUrl}/user/profile`, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization : "Bearer " + token 
                        },
                    }) 
                    const data = await responseProfile.json()
                    if (responseProfile.ok){
                        dispatch(setProfile({data: data.user}))
                    }else{
                        Toast.show({
                            type: "general",
                            text1: "Warning",
                            text2: data.message
                        })
                    }
                    router.push("/tabs/home")
                }catch(err){
                    setLoading(false)
                    Toast.show({
                        type: "general",
                        text1: "Warning",
                        text2: "Server is under maintenance"
                    })
                }
            }
        }catch(err){
            Toast.show({
                type: "general",
                text1: "Warning",
                text2: "Server is under maintenance"
            })
        }
    }

    return(
        <View className="flex-1 justify-center items-center">
            <MaterialIcons name="account-circle" size={180} 
            color={"black"}  
            className="mb-1"
            />
            <View className="flex w-full gap-5 items-center">
                <Text className="text-2xl text-black dark:text-white">What should people call you ?</Text>
                <TextInput 
                onChangeText={Setusername}
                value={username}
                placeholder="Username"
                className="w-80 h-12 bg-slate-300 text-black rounded-xl pl-3 text-xl" 
                />
                <TouchableOpacity
                onPress={editUsername}
                className="bg-purple-500 h-14 rounded-xl flex justify-center items-center px-10 mr-14 ml-14"
                >
                {loading ? 
                (<ActivityIndicator size={"large"} color={"black"}/>) : 
                (<Text className="text-4xl text-black dark:text-white">Continue</Text>)}
                </TouchableOpacity>
            </View>
        </View>
    )
}