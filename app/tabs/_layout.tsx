import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import HeaderRight from "@/components/headerRight";


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
          tabBarStyle: { backgroundColor: "#1e293b", height: 60 },
          tabBarActiveTintColor: "#facc15",
          tabBarInactiveTintColor: "#94a3b8",
        }}
      >
        {/* Home */}
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => <MaterialIcons name="home" size={24} color={color} />,
            headerRight: () => (
              <HeaderRight/>
            ),
          }}
        />
  
        {/* Profile */}
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color }) => <MaterialIcons name="person" size={24} color={color} />,
            headerRight: () => (
              <TouchableOpacity onPress={() => router.push("/home")}>
                <MaterialIcons name="more-vert" size={24} color="#facc15" style={{ marginRight: 15 }} />
              </TouchableOpacity>
            )
          }}
        />
    </Tabs>
    )
}