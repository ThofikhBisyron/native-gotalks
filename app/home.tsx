import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";



export default function Home() {
    const router = useRouter()

    return(
        <View>
            <Text>Welcome To Home</Text>
            <Button title="Go To Login" onPress={() => router.push("/login")}/>
        </View>
    )
}