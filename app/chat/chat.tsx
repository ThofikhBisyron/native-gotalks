import HeaderChat from "@/components/headerChat";
import { useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";



export default function Chatscreen() {
    const router = useRouter()

    const contacts = {
        id : 1,
        name : "Hacker Girl",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL1D8_YIJm9XpGyo81GbGPIYFGhFrBKhs0TA&s",
      };

    const [messages, setMessages] = useState([
        {
            id:1,
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
        <View>

        </View>
        </View>
    )
}