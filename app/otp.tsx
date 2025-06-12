import { useState, useRef } from "react";
import { Text, View, Button, TextInput, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { ActivityIndicator } from "react-native";
import { login } from "@/redux/reducers/auth";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";



export default function Otp() {
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    const dataUser = useSelector((state : RootState) => state.auth.user)!
    const token = useSelector((state : RootState) => state.auth.token)!
    console.log(dataUser)
    console.log(token)
    const [loading, setLoading] = useState(false)
    const [otp, setOtp] = useState(["", "", "", ""])
    const inputRefs = useRef<Array<TextInput | null>>([])
    const dispatch = useDispatch()
    const router = useRouter()
    
    const handleOtp = (text : string, index : number) => {
        let newOtp = [...otp];
        if (text === "") {
            newOtp[index] = ""
            setOtp(newOtp)

            if(index > 0){
                inputRefs.current[index - 1]?.focus()
            }
            return
        }
        newOtp[index] = text;
        setOtp(newOtp)

        if (text && index < otp.length - 1) {
            inputRefs.current[index + 1]?.focus()
        }
    }


    const submitOtp = async () => {
        const codeOtp = otp.join("")
        console.log(codeOtp)
        if (codeOtp.length < otp.length){
            Toast.show({
                type: "general",
                text1: "Warning",
                text2: "Please enter the OTP code that has been provided"
            })
            return
        }
        setLoading(true)
        try{
            const response = await fetch(`${apiUrl}/user/verify-otp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId: dataUser?.id,
                    otp: codeOtp
                })
            })
            const data = await response.json()
            console.log(data)
            if (response.ok) {
                dispatch(login({token: data.token}))
                Toast.show({
                    type: "general",
                    text1: "Success",
                    text2: data.message
                })
                router.push("/tabs/home")
            }else {
                setLoading(false)
                Toast.show({
                    type: "general",
                    text1: "Warning",
                    text2: data.message
                })
            }
        }catch(err){
            setLoading(false)
            Toast.show({
                type: "general",
                text1: "Warning",
                text2: "Server is under maintenance"
            })
        }
    }

    const submitResendCode = async () => {
        try{
            const response = await fetch(`${apiUrl}/user/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: dataUser?.email,
                    phone_number: dataUser?.phoneNumber
                })
            })

            if (response.ok){
                setLoading(false)
                Toast.show({
                    type: "general",
                    text1: "Warning",
                    text2: "Server is under maintenance"
                })
            }
        }catch(err){

        }
    }
    
    return (
        <View className="flex-1 justify-center bg-white dark:bg-black">
                <Text className="text-center text-3xl mb-3 text-black dark:text-white">Enter Your Verification Code</Text>
                <Text className="text-center text-xl text-black dark:text-white">We have sent a verification code to</Text>
                <Text className="text-center text-xl text-black dark:text-white">{dataUser?.email}</Text>
                <View className="flex flex-row gap-3 justify-center m-4">
                    {otp.map((digit, index) =>
                    (
                    <TextInput
                    key={index}
                    ref={(ref) => (inputRefs.current[index] = ref)}
                    className="w-14 h-14 bg-slate-300 text-center text-black dark:text-white"
                    maxLength={1}
                    keyboardType="number-pad"
                    value={digit}
                    onChangeText={(text) => handleOtp(text, index)}
                    />
                    ))}
                </View>
                <TouchableOpacity 
                onPress={submitOtp} 
                disabled={loading}
                className="bg-slate-300 rounded-xl h-16 flex justify-center items-center ml-20 mr-20 mt-10 mb-10">
                    {loading ? (<ActivityIndicator size={"large"} color={"black"}/>) :
                    <Text className="text-4xl">Continue</Text>}
                    
                </TouchableOpacity>
                <View className="flex flex-row justify-center">
                    <Text className="text-xl text-black dark:text-white">Haven't received the code ?</Text>
                        <TouchableOpacity>
                            <Text className="text-xl text-black dark:text-white"> Resend code</Text>
                        </TouchableOpacity>
                </View>
                
        </View>

    )
}