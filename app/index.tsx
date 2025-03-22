import HeaderRight from "@/components/headerRight";
import Home from "./home";
import Login from "./login";
import Otp from "./otp";
import TabsLayout from "./tabs/_layout";
import HomeScreen from "./tabs/home";
import { Redirect } from "expo-router";


export default function Index() {

  return (
    
      <Redirect href="/tabs/home"/>
    
    
  );
}
