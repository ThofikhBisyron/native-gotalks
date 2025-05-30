    import { Text, View, Button, TextInput, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
    import { Picker } from "@react-native-picker/picker"
    import { SelectList } from "react-native-dropdown-select-list"
    import DropDownPicker from "react-native-dropdown-picker"
    import { useRouter } from "expo-router"
    import { useState } from "react"
    import { ActivityIndicator } from "react-native"
    import { Alert } from "react-native"
    import Toast from 'react-native-toast-message'


    export default function Login() {
        const apiUrl = process.env.EXPO_PUBLIC_API_URL;
        console.log(apiUrl)
        const [loading, setLoading] = useState(false)
        const router = useRouter()
        const [selcountry, setSelCountry] = useState("+62")
        console.log(selcountry)
        const [open, setOpen] = useState(false);
        const [items, setItems] = useState([
            { label: "🇮🇩 +62", value: "+62" },
            { label: "🇺🇸 +1", value: "+1" }
        ]);


        const [email, setEmail] = useState("")
        const [phone, setPhone] = useState("")
        
        const loginOrRegister = async () => {   
            
            if (!email || !phone) {
                Toast.show({
                type: 'general',
                text1: "Warning",
                text2: "Email and phone number must be filled in",
            })
            return
            }
            
            setLoading(true)
            try{
                const response = await fetch(`${apiUrl}/user/register`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email,
                        phone_number: selcountry + phone,
                        
                    })
                })
                console.log(selcountry + phone)
                const data = await response.json()
                console.log(data)
                
                if (response.ok) {
                    Toast.show({
                        type: "general",
                        text1: "Success",
                        text2: "The OTP code has been sent via email, please check your spam folder if you do not receive the email.",
                        autoHide: false,
                    })
                    router.push("/otp")
                } else {
                    setLoading(false)
                    Alert.alert("error", data.message)
                }
                
            }catch (err){
                 setLoading(false)
                Alert.alert("error")
            }
        }

    return (
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss(), setOpen(false)}}>
        <View className="flex-1 justify-center">
            <View className="flex justify-center">
                <Text className="text-center text-3xl mb-4 text-black dark:text-white">Enter Your Email</Text>
                <View className="flex flex-row justify-center mb-4">
                    <TextInput 
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Email"
                    className="w-96 h-14 bg-slate-300 pl-4 rounded-xl text-xl text-black dark:text-white"
                    />
                </View>
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
                    value={phone}
                    onChangeText={setPhone}
                    className="w-60 h-14 bg-slate-300 pl-4 rounded-xl text-xl text-black dark:text-white" 
                    keyboardType="phone-pad"/>
                </View>
                <TouchableOpacity
                onPress={loginOrRegister}
                disabled={loading}
                className="bg-slate-300 rounded-xl h-16 flex justify-center items-center ml-20 mr-20 mt-10">
                    {loading ? (<ActivityIndicator size="large" color="black"/>) :
                    (<Text className="text-4xl text-black dark:text-white">Continue</Text>)}           
                </TouchableOpacity>
            </View>
        </View>
        </TouchableWithoutFeedback>
    );
    }
