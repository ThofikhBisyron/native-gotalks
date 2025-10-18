import * as Contacts from 'expo-contacts'
import Toast from 'react-native-toast-message'

export const requestContactPermission = async () => {
    const { status } = await Contacts.requestPermissionsAsync()
    if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
            fields : [Contacts.Fields.PhoneNumbers],    
        })
        if (data.length > 0) {
            const PhoneNumbers = data
            .map(c => c.phoneNumbers?.[0]?.number)
            .filter(Boolean)
            return PhoneNumbers
        }
    } else {
        Toast.show({
            type: "general",
            text1: "Warning",
            text2: "To find your friends who use GoTalks, enable contact permission from settings."
        })
    }
}