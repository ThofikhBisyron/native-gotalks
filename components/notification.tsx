import { Text, TouchableOpacity} from "react-native"

interface TypeNotification {
    title : any,
    message : string,
    onPress : () => void,
}

export default function Notification({title, message, onPress}: TypeNotification) {
    return(
        <TouchableOpacity onPress={onPress}>
            <Text>{title}</Text>
            <Text>{message}</Text>
        </TouchableOpacity>
    )
}