  import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
  import { useState } from "react";
  import { useSelector } from "react-redux";
  import { RootState } from "@/redux/store";

  export default function ProfileScreen() {
    const [activetab, setActiveTab] = useState("Contacts")
    const profile = useSelector((state: RootState) => state.profile.data)!

    const contact = [
      {
        id: 1, 
        name: "raisya", 
        phone: "62888888888", 
        Image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL1D8_YIJm9XpGyo81GbGPIYFGhFrBKhs0TA&s"},
      {
        id: 2, 
        name: "", 
        phone: "62888888888", 
        Image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL1D8_YIJm9XpGyo81GbGPIYFGhFrBKhs0TA&s"},
    ]

    const group =[
      {id:1, 
        name: "keluarga", 
        chat: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        imagegroup:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL1D8_YIJm9XpGyo81GbGPIYFGhFrBKhs0TA&s",
      },

      {
        id:2, 
        name: "keluarga2", 
        chat: "aaaaaaaaaaa",
        imagegroup:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL1D8_YIJm9XpGyo81GbGPIYFGhFrBKhs0TA&s"
      },
    ]

    return (
      <View className="flex-1 bg-white dark:bg-black">
        <View>
          <Image source={{ uri : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL1D8_YIJm9XpGyo81GbGPIYFGhFrBKhs0TA&s'}}
          className="w-full h-52 object-cover absolute"
          />
          <Image source={{ uri : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL1D8_YIJm9XpGyo81GbGPIYFGhFrBKhs0TA&s'}}
          className="w-32 h-32 mt-36 rounded-full ml-4"/>
        </View>
        <View className="flex gap-2 mt-4 ml-5">
          <Text className="text-2xl font-bold text-black dark:text-white">Example Name</Text>
          <Text className="text-xl text-black dark:text-white">{'@' + 'exampleusername'}</Text>
          <Text className="text-xl text-black dark:text-white">link social media</Text>
          <Text className="text-xl text-black dark:text-white">Description</Text>
        </View>
        <View className="flex flex-row mt-10 h-14 pt-3">
          <TouchableOpacity className={`w-1/2 ${activetab === 'Contacts' ? " border-b-2" : ""}`}
          onPress={() => setActiveTab('Contacts')}>
            <Text className="text-center text-xl text-black dark:text-white">Contacts</Text>
          </TouchableOpacity>
          <TouchableOpacity className={`w-1/2 ${activetab === 'Groups' ? " border-b-2" : ""}`}
          onPress={() => setActiveTab('Groups')}>
            <Text className="text-center text-xl text-black dark:text-white">Grups</Text>
          </TouchableOpacity>
        </View>
        <View className="overflow-scroll">
          {activetab === "Contacts" ? (
            <FlatList
            data={contact}
            renderItem={({item}) =>(
              <TouchableOpacity className="p-4 flex flex-row border-b-[1px] h-28">
                <Image source={{uri:item.Image}}
                className="w-20 h-20 rounded-full"
                />
                <View className="pl-3 justify-center">
                  <Text className="text-2xl w-full text-black dark:text-white">{item.name === "" ? item.phone : item.name}</Text>
                </View>
              </TouchableOpacity>
            )}
            />
          ) : (
            <FlatList
            data={group}
            renderItem={({item}) =>(
              <TouchableOpacity className="p-4 flex flex-row border-b-[1px] h-28">
                <Image source={{uri:item.imagegroup}}
                className="w-20 h-20 rounded-full"
                />
                <View className="pl-3 flex gap-2">
                  <Text className="text-xl font-bold text-black dark:text-white" numberOfLines={1}>{item.name}</Text>
                  <Text numberOfLines={1} className="text-black dark:text-white">{item.chat}</Text>
                </View>
              </TouchableOpacity>
            )}
            />
            )}
          
        </View>
      </View>
    );
  }
