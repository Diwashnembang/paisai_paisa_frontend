import { jsonRespone } from "@/types";
import {  useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons"; 
import { Text, TouchableOpacity, View ,TextInput, Button, StyleSheet} from "react-native";
import * as SecureStore from "expo-secure-store"
import useStore from "@/hooks/useStore";
import { Link, router } from "expo-router";
import "../../style.css";
import { LinearGradient } from "expo-linear-gradient";

export default function Index() {
  const [email ,setEmail] = useState<string>("")
  const [password,setPassword] = useState<string>("")
const   {authorized,setAuthorized} =  useStore()
  
useEffect(()=>{
 if(authorized) {
  router.replace("/(home)/home")
 }
},[authorized])

const handlePress = async () => {
  const formData = new URLSearchParams();
  formData.append("email", email);
  formData.append("password", password);

  console.log(`${process.env.EXPO_PUBLIC_DNS}/login`)
  try {
    let response = await fetch(`${process.env.EXPO_PUBLIC_DNS}/login`, {
      method: "POST", // Backend expects form submission, so use POST
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(), 
    });
    let r= await response.json()
    let result:jsonRespone = r

    if(result.success){
     try{
     await SecureStore.setItemAsync("token",result.payload?.token)
      setAuthorized(true)
     }catch{
      throw new Error("error storing token")
     }
    }else{
      console.log(result.payload?.error)
    }

  } catch (error) {
    console.error("Login failed:", error);
  }
};

return (
    <LinearGradient
      colors={['#f0f4ff', '#e5e9ff']}
      className="flex-1 justify-center p-6"
    >
      {/* Header Section */}
      <View className="items-center mb-12">
        <Text className="text-4xl font-extrabold text-gray-900 mb-2">
          Paisai Paisa
        </Text>
        <Text className="text-lg text-gray-600">Smart Money Management</Text>
        <View className="h-1 w-20 bg-indigo-500 rounded-full mt-4" />
      </View>

      {/* Input Fields */}
      <View className="space-y-6 mb-8">
        <View className="relative">
          <Feather
            name="mail"
            size={20}
            color="#4f46e5"
            style={{ position: 'absolute', left: 16, top: 20, zIndex: 10 }}
          />
          <TextInput
            className="w-full bg-white/90 p-4 pl-12 rounded-2xl text-lg"
            placeholder="Email address"
            placeholderTextColor="#94a3b8"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            style={{
              borderColor: '#e0e7ff',
              borderWidth: 1,
              shadowColor: '#4f46e5',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
            }}
          />
        </View>

        <View className="relative">
          <Feather
            name="lock"
            size={20}
            color="#4f46e5"
            style={{ position: 'absolute', left: 16, top: 20, zIndex: 10 }}
          />
          <TextInput
            className="w-full bg-white/90 p-4 pl-12 rounded-2xl text-lg"
            placeholder="Password"
            placeholderTextColor="#94a3b8"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={{
              borderColor: '#e0e7ff',
              borderWidth: 1,
              shadowColor: '#4f46e5',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
            }}
          />
        </View>
      </View>

      {/* Login Button */}
      <TouchableOpacity
        onPress={handlePress}
        style={{
          backgroundColor: '#4f46e5',
          padding: 20,
          borderRadius: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 4,
        }}
      >
        <Text className="text-center text-white text-lg font-semibold tracking-wide">
          Sign In
        </Text>
      </TouchableOpacity>
  {/* Sign up */}
      <Link href={"/(auth)/signup"} className="mt-4 "asChild>
      <TouchableOpacity
        style={{
          backgroundColor: '#4f46e5',
          padding: 20,
          borderRadius: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 4,
        }}
      >
        <Text className="text-center text-white text-lg font-semibold tracking-wide">
          Sign Up
        </Text>
      </TouchableOpacity>
      </Link>

      {/* Additional Options */}
      <TouchableOpacity className="mt-6 self-center">
        <Text className="text-indigo-600 text-sm font-medium underline">
          Forgot Password?
        </Text>
      </TouchableOpacity>

      {/* Decorative Elements */}
      <View className="absolute bottom-0 w-full flex-row justify-between opacity-20">
        <View className="w-24 h-24 rounded-full bg-indigo-300 -mb-12 -ml-12" />
        <View className="w-32 h-32 rounded-full bg-blue-300 -mr-16" />
      </View>
    </LinearGradient>
  );

}
