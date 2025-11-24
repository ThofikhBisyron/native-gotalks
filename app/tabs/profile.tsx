  import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
  import { useState, useEffect } from "react";
  import { useRouter } from "expo-router"
  import { useSelector } from "react-redux";
  import { RootState } from "@/redux/store";
  import MaterialIcons from '@expo/vector-icons/MaterialIcons';
  import { requestContactPermission } from "@/utils/contactPermission";


  export default function ProfileScreen() {
    const [activetab, setActiveTab] = useState("Contacts")
    const [contacts, setContacts] = useState<contactItem[]>([])
    const [groups, setGroups] = useState<groupsItem[]>([])
    const profile = useSelector((state: RootState) => state.profile.data)!
    const token = useSelector((state: RootState) => state.auth.token)
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    const router = useRouter()

    useEffect(() => {
      (async () => {
        await createContact();
        await getContact();
        await getGroups()
      })()
  }, [])

  if (!profile) {
        return (
          <View className="flex-1 items-center justify-center">
            <Text className="text-black dark:text-white">Please login to view your profile</Text>
          </View>
        );
      }

    type contactItem = {
      id : number,
      image: string | null,
      username : string | null,
      phone_number: number | null
    }

    type groupsItem = {
      id : number,
      name : string | null,
      image : string | null
    }

    const createContact = async () => {
      try{
        const reqContact = await requestContactPermission()
        const response = await fetch(`${apiUrl}/contact/create`, {
          method : "POST",
          headers: {
            "Content-Type" : "application/json",
            Authorization : "Bearer " + token
          },
          body : JSON.stringify({
            phoneNumber : reqContact
          })
        })
      }catch(err){
        console.log(err)
      }
    }

    const getContact = async () => {
      try{
      const response = await fetch(`${apiUrl}/contact/list-contact`, {
        headers : {
          "Content-Type" : "application/json",
          Authorization : "Bearer " + token
        },
      })
      const data = await response.json()
      setContacts(data.data)
    }catch(err){
      console.log(err)
    }
    }

    const handleUserRoute = (contact: any) => {
      router.push({
        pathname: `/chat/[type]/[id]`,
        params: {
          type: "user",
          id: contact.contact_id.toString(),
          name: contact.username || contact.phone_number,
          image: contact.image ? `${apiUrl}/uploads/profile/${contact.image}` : null
        }
      })
    }

    const handleGroupsRoute = (groups: any) => {
    router.push({
      pathname: `/chat/[type]/[id]`,
      params: {
        type: "group",
        id: groups.id.toString(),
        name: groups.name,
        image: groups.image ? `${apiUrl}/uploads/profile/${groups.image}` : null
        }
      })
    }

    const getGroups = async () => {
      try{
        const response = await fetch(`${apiUrl}/group/list`, {
          headers:{
            "Content-Type" : "application/json",
            Authorization : "Bearer " + token
          }
        })
        const data = await response.json()
        setGroups(data.data)
      }catch(err){
        console.log(err)
      }
    }

    return (
      <View className="flex-1 bg-white dark:bg-black">
        <View>
          {profile?.image_background === null ?
          (
          <Text className="text-center">This user has not entered a background image yet</Text>
          ) : 
          (
          <Image source={{ uri : apiUrl + "/uploads/profile_background/" + profile?.image_background}}
          className="w-full h-52 object-cover absolute"
          />
          )}
          {profile?.image === null ? 
          (
          <MaterialIcons name="account-circle" size={92} color="black" className="ml-4 mt-36"/>
          ) : 
          (
          <Image source={{ uri : apiUrl + "/uploads/profile/" + profile?.image}}
          className="w-32 h-32 mt-36 rounded-full ml-4"/>
          )}
          <TouchableOpacity 
          className="absolute bg-purple-200 border-[1px] rounded-3xl left-72 top-60 p-2"
          onPress={() => router.push("/settings/account")}>
            <Text>Edit Profile</Text>
          </TouchableOpacity>  
        </View>
        <View className="flex gap-2 mt-4 ml-5">
          <Text className="text-2xl font-bold text-black dark:text-white">{profile.username}</Text>
          <Text className="text-xl text-black dark:text-white">+{profile.phone_number}</Text>
          <Text className="text-xl text-black dark:text-white">{profile.email}</Text>
          <Text className="text-xl text-black dark:text-white">{profile.description == null ? "description has not been filled in" : profile.description }</Text>
        </View>
        <View className="flex flex-row mt-10 h-14 pt-3">
          <TouchableOpacity className={`w-1/2 ${activetab === 'Contacts' ? " border-b-2" : ""}`}
          onPress={() => setActiveTab('Contacts')}>
            <Text className="text-center text-xl text-black dark:text-white">Contacts</Text>
          </TouchableOpacity>
          <TouchableOpacity className={`w-1/2 ${activetab === 'Groups' ? " border-b-2" : ""}`}
          onPress={() => setActiveTab('Groups')}>
            <Text className="text-center text-xl text-black dark:text-white">Grups</Text>
          </TouchableOpacity>
        </View>
          {activetab === "Contacts" ? (
            <FlatList
            data={contacts}
            renderItem={({item}) =>(
              <TouchableOpacity className="p-4 flex flex-row border-b-[1px] h-28" onPress={() => handleUserRoute(item)}>
                <Image source={{uri: apiUrl + "/uploads/profile/" + item.image }}
                className="w-20 h-20 rounded-full"
                />
                <View className="pl-3 justify-center">
                  <Text className="text-2xl w-full text-black dark:text-white">{item.username === "" ? item.phone_number : item.username}</Text>
                </View>
              </TouchableOpacity>
            )}
            />
          ) : (
            <FlatList
            data={groups}
            renderItem={({item}) =>(
              <TouchableOpacity className="p-4 flex flex-row border-b-[1px] h-28" onPress={() => handleGroupsRoute(item)}>
                <Image source={{uri: apiUrl + "/uploads/groups/" + item.image }}
                className="w-20 h-20 rounded-full"
                />
                <View className="pl-3 items-center justify-center">
                  <Text className="text-xl font-bold text-black dark:text-white" numberOfLines={1}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            )}
            />
            )}  
      </View>
    );
  }
