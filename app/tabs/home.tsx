import { useRouter } from "expo-router"
import { useEffect, useState } from "react"
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native"
import { TextInput } from "react-native-paper"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import Toast from "react-native-toast-message"
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

export default function HomeScreen() {
  const token = useSelector((state : RootState) => state.auth.token)!

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const [chatlist, setChatlist] = useState<ChatItem[]>([])
  console.log(token)
  console.log(chatlist)
  const router = useRouter()

  useEffect(() => {
      if (token === null){
          const timeout = setTimeout(() => {
              router.push("/login")
          }, 0)
          return () => clearTimeout(timeout)
      }
      getChatList()
  }, [])

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
  
  const getChatList = async () => {
    try{
      const response = await fetch(`${apiUrl}/message/chatlist`, {
        headers: {
          "Content-Type": "application/json",
          Authorization : "Bearer " + token 
        },
      })
      const data = await response.json()
      if (response.ok){
        setChatlist(data.data)
      }
    }catch(err){
      Toast.show({
        type: "general",
        text1: "Warning",
        text2: "Server is under maintenance"
    })
    }
  }

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
        const imageUri = item.type === 'user' ? item.image : item.group_image ? `${apiUrl}/${item.group_image}` : null
        return(
        <TouchableOpacity className="flex flex-row gap-3 mt-1" 
        onPress={() => router.push({
          pathname: `/chat/[type]/[id]`,
          params: {
            type: item.type,
            id: item.target_id.toString(),
            name : item.type === "user" ? item.target_name : item.group_name,
            image: item.type === "user" ? item.image : item.group_image ? `${apiUrl}/${item.group_image}` : null
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
