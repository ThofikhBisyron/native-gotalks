import { useState } from "react";
import { View, Text, Image, FlatList } from "react-native";
import { TextInput } from "react-native-paper";

export default function HomeScreen() {
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
        className="bg-slate-300 rounded-full mr-5 ml-5 mt-5 mb-3"
        style={{ height: 40}}
        />
      </View>
      <FlatList 
      data={listchat}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({item, index}) => (
        <View className="flex flex-row gap-3">
          <Image 
          source={{ uri : item.image}}
          className="w-20 h-20 rounded-full ml-5"
          />
          <View className={`flex h-20 overflow-hidden w-full 
            ${index === 0 ? "border-t-[1px]" : "" }
            ${listchat.length - 1 ? "border-b-[1px]" : ""}
            `}>
              <Text className="text-2xl mb-1">{item.Name}</Text>
              <Text className="w-60">{item.Chat}</Text>
          </View>
        </View>
      )}
      />
      <Text className="text-xl font-bold text-black dark:text-white">Home Page</Text>
    </View>
  );
}
