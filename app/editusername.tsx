import { View, Text, TextInput, TouchableOpacity } from "react-native"
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


export default function EditUsername() {

    return(
        <View className="flex-1 justify-center items-center">
            <MaterialIcons name="account-circle" size={180} 
            color={"black"}  
            className="mb-1"
            />
            <Text className="mb-3">What should people call you ?</Text>
            <TextInput 
            placeholder="Username"
            className="w-72 h-12 bg-slate-300 text-black rounded-xl mb-3"
            />
            <TouchableOpacity>
                <Text>Continue</Text>
            </TouchableOpacity>
        </View>
    )
}