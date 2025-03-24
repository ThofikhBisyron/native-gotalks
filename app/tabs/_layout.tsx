import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import HeaderRight from "@/components/headerRight";
import { FullWindowOverlay } from "react-native-screens";


export default function TabsLayout() {
  const router = useRouter()
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

    return (
        <Tabs
        screenOptions={{
          headerStyle: { backgroundColor: "#1e293b" },
          headerTintColor: "#facc15",
          tabBarStyle: { 
            backgroundColor: "#1e293b", 
            height: 70,
             },
          tabBarActiveTintColor: "#facc15",
          tabBarInactiveTintColor: "#94a3b8",
        }}
      >

         {/* { Profile }  */}
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

    </Tabs>
    )
}