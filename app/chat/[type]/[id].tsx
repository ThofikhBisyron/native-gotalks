import HeaderChat from "@/components/headerChat";
import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, View, Text, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import { TextInput } from "react-native-paper";
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message"
import { RootState } from "@/redux/store";
import { getSocket } from "@/utils/socket";



export default function Chatscreen() {
    const token = useSelector((state : RootState) => state.auth.token)!
    const profile = useSelector((state : RootState) => state.profile.data)!
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    const { id, type } = useLocalSearchParams<{ id: string; type: string }>();
    const { name, image } = useLocalSearchParams<{ name: string; image: string }>();
    const [messages, setMessages] = useState<Message[]>([])
    const [inputtext, setInputText] = useState(40)
    const [text, setText] = useState("")
    const router = useRouter()

    if (!profile) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Loading...</Text>
      </View>
    )
  }

    interface Message {
    id?: number;
    content: string;
    created_at: string;
    sender_id: number;
    receiver_id?: number | null;
    group_id?: number | null;
    }

    useEffect(() => { 
        const socket = getSocket();

        if (!socket) {
        console.log("⚠️ Socket belum terkoneksi");
        return;
        }

        if (type === "group") {
        socket.emit("join_chat", { groupId: parseInt(id!) });
        console.log(`📩 Join group_${id}`);
        }

        socket.emit("get_message", {
        ...(type === "group"
            ? { groupId: parseInt(id!) }
            : { receiverId: parseInt(id!) }),
        });

        socket.on("message_history", (data: Message[]) => {
        setMessages(data);
        });

        socket.on("new_message", (message: Message) => {
        setMessages((prev) => [...prev, message]);
        });

        return () => {
        socket.off("message_history");
        socket.off("new_message");
        };

    }, [])

    
    const sendMessage = () => {
        if (!text.trim()) return;

        const socket = getSocket();
        if (!socket || !socket.connected) {
            console.log("⚠️ Socket belum terkoneksi");
            return;
        }

        const messagePayload = {
            content: text,
            ...(type === "group"
            ? { groupId: parseInt(id!) }
            : { receiverId: parseInt(id!) }),
        };

        socket.emit("send_message", messagePayload);
        setText("");
    }


    const reverseMessage = [...messages].reverse()
    
    return (
        <View className="flex-1">
        <View className="mb-24">
        <HeaderChat 
        name={name} 
        image={image}
        />          
        </View>
        <FlatList
        data = {reverseMessage}
        inverted
        renderItem={({item}) =>(
            <View className={`my-1 px-3 ${item.sender_id === profile.id ? "items-end" : "items-start"}`}>
                {type === "group" && item.sender_id !== profile.id && (
                <Text className="text-sm text-gray-500 mb-1">User {item.sender_id}</Text>
                )}
                <View className={`rounded-xl px-3 py-3 ${item.sender_id === profile.id ? "bg-green-300" : "bg-slate-300"}`}>
                    <Text className="text-xl text-black dark:text-white">{item.content}</Text>
                </View>
            </View>
        )}  
        />

        <View className="flex flex-row justify-between mr-3 ml-3 mb-2">
            <TextInput mode="outlined" outlineColor="transparent" activeOutlineColor="transparent" 
            value={text}
            onChangeText={setText}
            multiline={true} 
            numberOfLines={4} 
            placeholder="Type a message"
            textAlignVertical="top" 
            scrollEnabled={true}
            onContentSizeChange={(event) =>{
                setInputText(Math.min(120, event.nativeEvent.contentSize.height))
            }}
            style={[
                {height: inputtext, minHeight:40, maxHeight:120},
                {fontSize: 16}
            ]}
            className="rounded-3xl w-96 bg-slate-300 pr-16"
            />
            <TouchableOpacity className="absolute right-6 bottom-3 items-center" onPress={sendMessage}>
                <MaterialIcons name="send" size={40}/>
            </TouchableOpacity>
        </View>
        </View>
    )
}