import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { useState, useCallback } from "react";
import HeaderRight from "@/components/headerRight";
import { FullWindowOverlay } from "react-native-screens";
import { BackHandler } from "react-native";



export default function TabsLayout() {
  const router = useRouter()
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        return true;
      };
  
      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );
  
      return () => subscription.remove();
      }, [])
      );

    return (
        <Tabs
        screenOptions={{
          headerStyle: { backgroundColor: "#1e293b" },
          headerTintColor: "#a855f7",
          tabBarStyle: { 
            backgroundColor: "#1e293b", 
            height: 70,
             },
          tabBarActiveTintColor: "#a855f7",
          tabBarInactiveTintColor: "#94a3b8",
        }}
      >

         {/* profile */}
        <Tabs.Screen
          name="profile"
          options={{
            title: "GoTalks",
            tabBarLabel: "Profile",
            tabBarIcon: ({ color }) => <MaterialIcons name="person" size={24} color={color} />,
            headerRight: () => (
              <HeaderRight/>
            )
          }}
        />
          {/* {Home} */}
        <Tabs.Screen
            name="home"
            options={{
              title: "GoTalks",
              tabBarLabel: () => null,
              tabBarIcon: ({ color }) => 
              <MaterialIcons name="home" size={50} color={color}/>,
              tabBarIconStyle: {
                width: 100,
                height: 100, 
                borderRadius: 100, 
                top: -30, 
                backgroundColor: "#1e293b", 
                
              },
              headerRight: () => (
                <HeaderRight/>
            ),
          }}
          />

          <Tabs.Screen 
          name="historyCall"
          options={{
            title:"GoTalks",
            tabBarLabel: "Call",
            tabBarIcon: ({color}) => <MaterialIcons name="history" size={24} color={color}/>,
            headerRight:() => (
              <HeaderRight/>
            )
          }}
          />

    </Tabs>
    )
}