import HeaderRight from "@/components/headerRight";
import Home from "./home";
import Login from "./login";
import Otp from "./otp";
import TabsLayout from "./tabs/_layout";
import HomeScreen from "./tabs/home";
import { Redirect } from "expo-router";
import EditUsername from "./editusername";
import HeaderChat from "@/components/headerChat";
import Chatscreen from "./chat/chat"
import Setting from "./settings/setting";


export default function Index() {

  return (
    
      <Home/>
      // <HomeScreen/>
    
    
  );
}
