import { Text, View } from "react-native"
import { MotiText } from "moti";

export default function Opening() {
    
    
    return(
    <View className="flex-1 justify-center items-center">
        <MotiText from={{ opacity: 0, scale:0.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: "timing",
          duration: 2000,
        }}
        className="text-7xl text-[#facc15] font-bold">GoTalks</MotiText>    
    </View>
    )
    
}