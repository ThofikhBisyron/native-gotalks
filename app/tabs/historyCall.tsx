import { View, Text, FlatList, TouchableOpacity, Image, } from "react-native";
import icons from '@react-native-vector-icons/material-icons'
import { MaterialIcons } from "@expo/vector-icons";

export default function HistoryCall() {


  const call =[
    {
      id: 1,
      name: "Raisya",
      phone: "6288888888",
      call: 4,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL1D8_YIJm9XpGyo81GbGPIYFGhFrBKhs0TA&s",

    }
  ]
  return (
    <View className="flex-1 bg-white dark:bg-black">
      <FlatList
      data={call}
      renderItem={({item}) =>(
        <TouchableOpacity className="flex flex-row justify-between mt-1 ml-3 ">
          <View className="flex flex-row gap-3"> 
            <Image source={{uri: item.image}}
            className="w-20 h-20 rounded-full"
            />
            <View className="justify-center">
              <Text className="text-2xl font-bold">{item.name === "" ? item.phone : item.name}</Text>
              <Text 
              className={`font-bold ${item.call === 1 || item.call === 4 ? "text-red-500" : "text-green-500"}`}>  
              {item.call === 1 ? "Missed Call" : 
              item.call === 2 ? "Outgoing Call" : 
              item.call === 3 ? "Received Call" : "Outgoing Missed Call"}
              </Text>
            </View>
          </View> 
          <View>
            <MaterialIcons 
            name={
              item.call === 1 ? "call-missed" 
              : item.call === 2 ? "call-made" 
              : item.call === 3 ? "call-received" 
              : "call-missed-outgoing"} 
            size={60} color="green" 
            className="w-full h-full" />
          </View>     
        </TouchableOpacity>
      )}
      />
    </View>
  );
}
