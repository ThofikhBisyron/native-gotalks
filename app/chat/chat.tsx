import HeaderChat from "@/components/headerChat";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, View, Text, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";



export default function Chatscreen() {
    const router = useRouter()

    const contacts = {
        id : 1,
        name : "RS",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL1D8_YIJm9XpGyo81GbGPIYFGhFrBKhs0TA&s",
      };

    const [messages, setMessages] = useState([
        {
            id: 1,
            sender: contacts.name,
            message: "How Are You Today",
            isme: false,
            type: "text"
        },
        {
            id: 2,
            sender: "you",
            message: "Im Fine Thankyou",
            isme: true,
            type: "text",
        }
    ])
    
    return (
        <View className="flex-1">
        <HeaderChat 
        name={contacts.name} 
        image={contacts.image}
        />  
        <FlatList
        data = {messages.reverse()}
        inverted
        renderItem={({item}) =>(
            <View className={`my-1 ${item.isme ? "items-end" : "items-start"}`}>
                <View className={`rounded-xl px-3 py-3 ${item.isme ? "bg-green-300" : "bg-slate-300"}`}>
                    <Text>{item.message}</Text>
                </View>
            </View>
        )}  
        />
        <View className="flex flex-row justify-between mr-3 ml-3">
            <TextInput mode="outlined" outlineColor="transparent" 
            multiline={false} 
            numberOfLines={3} 
            placeholder="Type a message"
            textAlignVertical="top" 
            className="rounded-3xl w-96 bg-slate-300"
            />
            <TouchableOpacity className="items-center justify-center">
                <MaterialIcons name="send" size={40}/>
            </TouchableOpacity>
        </View>
        </View>
    )
}