import { useState } from "react";
import { Text, View, Button, TextInput, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from "react-native";



export default function Otp() {
    const [email, setEmail] = useState("syaifania.raisya@gmail.com")
    const [otp, setOtp] = useState(["", "", "", ""])
    
    const handleOtp = (text : string, index : number) => {
        let newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp)
        
    }

    const submitOtp = async () => {
        const codeOtp = otp.join("")
        console.log(codeOtp)
    }
    
    return (
        <View className="flex-1 justify-center bg-white dark:bg-black">
                <Text className="text-center text-3xl mb-3 text-black dark:text-white">Enter Your Verification Code</Text>
                <Text className="text-center text-xl text-black dark:text-white">We have sent a verification code to</Text>
                <Text className="text-center text-xl text-black dark:text-white">{email}</Text>
                <View className="flex flex-row gap-3 justify-center m-4">
                    {otp.map((digit, index) =>
                    (
                    <TextInput
                    key={index}
                    className="w-14 h-14 bg-slate-300 text-center text-black dark:text-white"
                    maxLength={1}
                    keyboardType="number-pad"
                    value={digit}
                    onChangeText={(text) => handleOtp(text, index)}
                    />
                    ))}
                </View>
                <TouchableOpacity onPress={submitOtp} className="bg-slate-300 rounded-xl h-16 flex justify-center items-center ml-20 mr-20 mt-10 mb-10">
                    <Text className="text-4xl">Continue</Text>
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