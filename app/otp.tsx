import { useState } from "react";
import { Text, View, Button, TextInput, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from "react-native";



export default function Otp() {
    const [phoneumber, setPhoneNumber] = useState("+6288888888")
    const [otp, setOtp] = useState(["", "", "", ""])

    const handleOtp = (text : any, index : any) => {
        let newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp)

    }
    
    return (
        <View className="flex-1 justify-center">
                <Text className="text-center text-3xl mb-3">Enter Your Verification Code</Text>
                <Text className="text-center text-xl">We have sent a verification code to</Text>
                <Text className="text-center text-xl">{phoneumber}</Text>
                <View className="flex flex-row gap-3 justify-center m-4">
                    {otp.map((digit, index) =>
                    (
                    <TextInput
                    key={index}
                    className="w-14 h-14 bg-slate-300 text-center"
                    maxLength={1}
                    keyboardType="number-pad"
                    value={digit}
                    onChange={(text) => handleOtp(text, index)}
                    />
                    ))}
                    
                </View>
        </View>

    )
}