

import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import { Menu, Divider } from "react-native-paper";



export default function HeaderRight() {
    const [visible, setVisible] = useState(false)
    const router = useRouter()

    const close = () =>setVisible(false)
    const open = () =>setVisible(true)
    return(
    <View>
        <Menu
        visible= {visible}
        onDismiss={close}
        anchor={
            <TouchableOpacity onPress={open}>
                <MaterialIcons name="more-vert" size={24} color="#facc15"/>
            </TouchableOpacity>
        }
        >
        <Menu.Item
        title= "setting"
        onPress={() => {
            close()
            router.push("/home")}
        }
        />
            
        </Menu>
    </View>

    )
}