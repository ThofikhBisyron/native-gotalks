import { View, Text, TextInput, TouchableOpacity } from "react-native"
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from "expo-router";


export default function EditUsername() {
    const router = useRouter()

    return(
        <View className="flex-1 justify-center items-center">
            <MaterialIcons name="account-circle" size={180} 
            color={"black"}  
            className="mb-1"
            />
            <View className="flex gap-5">
                <Text className="text-2xl text-black dark:text-white">What should people call you ?</Text>
                <TextInput 
                placeholder="Username"
                className="w-72 h-12 bg-slate-300 text-black rounded-xl pl-3 text-xl" 
                />
                <TouchableOpacity
                onPress={() => router.push("/tabs/home")}
                className="bg-slate-300 h-14 rounded-xl flex justify-center items-center mr-14 ml-14"
                >
                    <Text className="text-4xl text-black dark:text-white">Continue</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}