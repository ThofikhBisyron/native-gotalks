    import { Text, View, Button, TextInput, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
    import { Picker } from "@react-native-picker/picker"
    import { SelectList } from "react-native-dropdown-select-list"
    import DropDownPicker from "react-native-dropdown-picker";
    import { useRouter } from "expo-router";
    import { useState } from "react";


    export default function Login() {
        const router = useRouter()
        const [selcountry, setSelCountry] = useState("+62")
        const [open, setOpen] = useState(false);
        const [items, setItems] = useState([
            { label: "🇮🇩 +62", value: "+62" },
            { label: "🇺🇸 +1", value: "+1" }
        ]);

    return (
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss(), setOpen(false)}}>
        <View className="flex-1 justify-center">
            <View className="flex justify-center">
                <Text className="text-center text-3xl mb-4 text-black dark:text-white">Enter Your Phone Number</Text>
                <View className="flex flex-row mb-4 gap-4 justify-center">
                    <View className="w-32 h-14 bg-slate-300 rounded-xl text-xl" >
                    <DropDownPicker
                        open={open}
                        value={selcountry}
                        items={items}
                        setOpen={setOpen}
                        setValue={setSelCountry}
                        setItems={setItems}
                        searchable={true} 
                        searchPlaceholder="search"
                        placeholder="🇮🇩 +62"
                        containerStyle={{ width: "100%" }}
                        style={{ backgroundColor: "slate-300", borderRadius: 10 }}
                        dropDownContainerStyle={{ backgroundColor: "#ffffff" }}
                        textStyle={{ fontSize: 16 }}
                    />
                    </View>
                    <TextInput
                    placeholder="Phone Number"
                    className="w-60 h-14 bg-slate-300 pl-4 rounded-xl text-xl" 
                    keyboardType="phone-pad"/>
                </View>
                <TouchableOpacity
                onPress={() => router.push("/tabs/home")} 
                className="bg-slate-300 rounded-xl h-16 flex justify-center items-center ml-20 mr-20 mt-10">
                    <Text className="text-4xl">Continue</Text>
                </TouchableOpacity>
            </View>
        </View>
        </TouchableWithoutFeedback>
    );
    }
