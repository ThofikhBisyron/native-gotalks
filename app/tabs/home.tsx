import { useRouter } from "expo-router"
import { useEffect, useState } from "react"
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native"
import { TextInput } from "react-native-paper"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "@/redux/store"
import Toast from "react-native-toast-message"
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { setProfile } from "@/redux/reducers/profile";
import { connectSocket, disconnectSocket, getSocket } from "@/utils/socket"
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";

export default function HomeScreen() {
  const token = useSelector((state : RootState) => state.auth.token)!
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const [chatlist, setChatlist] = useState<ChatItem[]>([])
  const profile = useSelector((state: RootState) => state.profile.data)!
  console.log(profile)
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }

    disconnectSocket(); 
    const socket = connectSocket(token);

    if (!socket) return;

    socket.emit("get_chat_list"); 

    socket.on("chat_list", (list: ChatItem[]) => {
      setChatlist(list);
    });

    socket.on("new_message", () => {
      socket.emit("get_chat_list");
    });

    return () => {  
      socket.off("chat_list");
      socket.off("new_message");
    };
  }, [token]);

  useFocusEffect(
  useCallback(() => {
    const socket = getSocket();
    if (socket && socket.connected) {
      socket.emit("get_chat_list");
    }
  }, [])
);

  type ChatItem = {
  id: number,
  type: "user" | "group",
  target_id: number,
  target_name: string | null,
  group_name: string | null,
  image: string | null,
  group_image: string | null,
  last_message: string,
  last_time: string,
  unread_count: number,
};
  



  return (
    <View className="flex-1 bg-white dark:bg-black">
      <View className=""> 
        <TextInput
        mode="outlined"
        outlineColor="transparent"
        placeholder="Search Chat"
        className="bg-slate-300 rounded-full mr-5 ml-5 mt-5 mb-3 text-black dark:text-white"
        style={{ height: 40}}
        />
      </View>
      <FlatList 
      data={chatlist}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({item, index}) => {
        const imageUri = item.type === 'user'
        ? item.image ? `${apiUrl}/uploads/profile/${item.image}` : null
        : item.group_image ? `${apiUrl}/uploads/groups/${item.group_image}` : null;
        return(
        <TouchableOpacity className="flex flex-row gap-3 mt-1" 
        onPress={() => router.push({
          pathname: `/chat/[type]/[id]`,
          params: {
            type: item.type,
            id: item.target_id.toString(),
            name : item.type === "user" ? item.target_name : item.group_name,
            image: item.type === "user" ? item.image : item.group_image ? item.group_image : null
          },
        }
        )}>
           {imageUri ? (
            <Image
              source={{ uri: imageUri }}
              className="w-20 h-20 rounded-full ml-5"
            />
          ) : (
            <View className="w-20 h-20 rounded-full ml-5 bg-slate-300 justify-center items-center">
              <MaterialIcons name="account-circle" size={40} color="gray" />
            </View>
          )}

          <View className={`flex h-20 overflow-hidden w-full 
            ${index === 0 ? "border-t-[1px]" : "" }
            ${chatlist.length - 1 ? "border-b-[1px]" : ""}
            `}>
              <Text className="text-2xl mb-1 text-black dark:text-white">
                {item.type === "user" ? item.target_name ?? "Unknown User" : item.group_name ?? "Unknown Group"}
              </Text>
              <Text className="w-60 text-black dark:text-white">
                {item.last_message}
              </Text>
          </View>
        </TouchableOpacity>
        )
      }}
      />
    </View>
  );
}
