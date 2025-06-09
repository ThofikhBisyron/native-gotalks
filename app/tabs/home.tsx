import { useRouter } from "expo-router";
import { useState } from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function HomeScreen() {
  const dataUser = useSelector((state : RootState) => state.auth.user)!
  const token = useSelector((state : RootState) => state.auth.token)!
  console.log(dataUser)
  console.log(token)
  const router = useRouter()
  const [listchat, setListChat] = useState([
    {
      id : 1,
      image : "https://media.istockphoto.com/id/680810342/photo/dog-watching-tv-on-the-couch.jpg?s=612x612&w=0&k=20&c=CQXmfuqlwL49GhcLDXIQSEZwq3iGpIkPJneWJUiI_0U=",
      Name : "Example",
      Chat : "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    },
    {
      id : 2,
      image : "https://media.istockphoto.com/id/680810342/photo/dog-watching-tv-on-the-couch.jpg?s=612x612&w=0&k=20&c=CQXmfuqlwL49GhcLDXIQSEZwq3iGpIkPJneWJUiI_0U=",
      Name : "Example",
      Chat : "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    },
    {
      id : 3,
      image : "https://media.istockphoto.com/id/680810342/photo/dog-watching-tv-on-the-couch.jpg?s=612x612&w=0&k=20&c=CQXmfuqlwL49GhcLDXIQSEZwq3iGpIkPJneWJUiI_0U=",
      Name : "Example",
      Chat : "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    }
  ])

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
      data={listchat}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({item, index}) => (
        <TouchableOpacity className="flex flex-row gap-3 mt-1" onPress={() => router.push("/chat/1")}>
          <Image 
          source={{ uri : item.image}}
          className="w-20 h-20 rounded-full ml-5"
          />
          <View className={`flex h-20 overflow-hidden w-full 
            ${index === 0 ? "border-t-[1px]" : "" }
            ${listchat.length - 1 ? "border-b-[1px]" : ""}
            `}>
              <Text className="text-2xl mb-1 text-black dark:text-white">{item.Name}</Text>
              <Text className="w-60 text-black dark:text-white">{item.Chat}</Text>
          </View>
        </TouchableOpacity>
      )}
      />
    </View>
  );
}
