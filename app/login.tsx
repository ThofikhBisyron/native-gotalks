    import { Text, View, Button, TextInput, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
    import { Picker } from "@react-native-picker/picker"
    import { SelectList } from "react-native-dropdown-select-list"
    import DropDownPicker from "react-native-dropdown-picker"
    import { useRouter } from "expo-router"
    import { useState, useEffect } from "react"
    import { ActivityIndicator } from "react-native"
    import { Alert } from "react-native"
    import Toast from 'react-native-toast-message'
    import { useDispatch, useSelector } from "react-redux"
    import { RootState } from '../redux/store'
    import { login } from "@/redux/reducers/auth"


    export default function Login() {
        const dataUser = useSelector((state:RootState) => state.auth.user)
        const token = useSelector((state:RootState) => state.auth.token)!
        console.log(token)
        const apiUrl = process.env.EXPO_PUBLIC_API_URL;
        const [loading, setLoading] = useState(false)
        const router = useRouter()
        const [selcountry, setSelCountry] = useState("+62")
        const [open, setOpen] = useState(false);
        const [items, setItems] = useState([
            { label: "🇮🇩 +62", value: "+62" },
            { label: "🇺🇸 +1", value: "+1" }
        ]);
        const dispatch = useDispatch() 

         useEffect(() => {
            if (token){
                const timeout = setTimeout(() => {
                    router.push("/tabs/home")
                }, 0)
                return () => clearTimeout(timeout)
            }
        }, [])


        const [email, setEmail] = useState("")
        const [phone, setPhone] = useState("")

        
        const loginOrRegister = async () => {   
            const lowerCase = email.toLocaleLowerCase()
            
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
                        email: lowerCase,
                        phone_number: selcountry + phone,
                        
                    })
                })
                const data = await response.json()
                
                if (response.ok) {
                    dispatch(login({user: data.user, token: null}))
                    Toast.show({
                        type: "general",
                        text1: "Success",
                        text2: "The OTP code has been sent via email, please check your spam folder if you do not receive the email.",
                        autoHide: false,
                    })
                    router.push("/otp")
                } else {
                    setLoading(false)
                    Toast.show({
                        type: "general",
                        text1: "Warning",
                        text2: data.message
                    })
                }
                
            }catch (err){
                setLoading(false)
                Toast.show({
                    type: "general",
                    text1: "Warning",
                    text2: "Server is under maintenance"
                })
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
                    className="w-96 h-14 bg-purple-100 pl-4 rounded-xl text-xl text-black dark:text-white"
                    />
                </View>
                <Text className="text-center text-3xl mb-4 text-black dark:text-white">Enter Your Phone Number</Text>
                <View className="flex flex-row mb-4 gap-4 justify-center">
                    <View className="w-32 h-14 bg-purple-100 rounded-xl text-xl" >
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
                        style={{ backgroundColor: "#f3e8ff", borderRadius: 10 }}
                        dropDownContainerStyle={{ backgroundColor: "#f3e8ff" }}
                        textStyle={{ fontSize: 16 }}
                    />
                    </View>
                    <TextInput
                    placeholder="Phone Number"
                    value={phone}
                    onChangeText={setPhone}
                    className="w-60 h-14 bg-purple-100 pl-4 rounded-xl text-xl text-black dark:text-white" 
                    keyboardType="phone-pad"/>
                </View>
                <TouchableOpacity
                onPress={loginOrRegister}
                disabled={loading}
                className="bg-purple-500 rounded-xl h-16 flex justify-center items-center ml-20 mr-20 mt-10">
                    {loading ? (<ActivityIndicator size="large" color="black"/>) :
                    (<Text className="text-4xl text-black dark:text-white">Continue</Text>)}           
                </TouchableOpacity>
            </View>
        </View>
        </TouchableWithoutFeedback>
    );
    }
