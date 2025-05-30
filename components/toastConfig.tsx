
import { View, Text, Image, TouchableOpacity } from 'react-native';



export const toastConfig =  {
    general:({ text1, text2, props}: any) => {
        const { image, onPress } = props || {}
        return(
            <TouchableOpacity onPress={onPress} className="flex-col bg-slate-600 p-5 rounded-lg shadow-lg mt-4">
                <Text className="text-white font-bold">{text1}</Text>
                <Text className="text-gray-300">{text2}</Text>
            </TouchableOpacity>
            )
    },
    //   success:({ text1, text2, props}: any) => {
    //     const { image, onPress } = props || {}
    //     return(
    //         <TouchableOpacity onPress={onPress} className="flex-col bg-slate-600 p-5 rounded-lg shadow-lg mt-4">
    //             <Text className="text-white font-bold">{text1}</Text>
    //             <Text className="text-gray-300">{text2}</Text>
    //         </TouchableOpacity>
    //         )
    // }


   
}