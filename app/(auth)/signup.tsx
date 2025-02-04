import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { Text, TouchableOpacity, View, TextInput } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store"
import useStore from "@/hooks/useStore";
import { jsonRespone } from "@/types";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const {setAuthorized}=useStore()
  const [ok, setOk] = useState<boolean>(true);

  const handleCreateAccount = async () => {
    if (password != confirmPassword) {
      setOk(false);
      return;
    }

    const formValues = new URLSearchParams();
    formValues.append("email", email);
    formValues.append("password", password);
    let response = await fetch(`${process.env.EXPO_PUBLIC_DNS}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formValues.toString(),
    });
    try{
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
    console.error("sign Up failed:", error);
  }
  };

  return (
    <LinearGradient
      colors={["#f0f4ff", "#e5e9ff"]}
      className="flex-1 justify-center p-6"
    >
      {/* Header Section */}
      <View className="items-center mb-10">
        <Text className="text-4xl font-extrabold text-gray-900 mb-2">
          Join Paisai Paisa
        </Text>
        <Text className="text-lg text-gray-600">
          Start Your Financial Journey
        </Text>
        <View className="h-1 w-20 bg-indigo-500 rounded-full mt-4" />
      </View>

      {/* Input Fields */}
      <View className="space-y-5 mb-6">
        {/* ... Email Input ... */}

        <View className="relative">
          <Feather
            name="mail"
            size={20}
            color="#4f46e5"
            style={{ position: "absolute", left: 16, top: 20, zIndex: 10 }}
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
              borderColor: "#e0e7ff",
              borderWidth: 1,
              shadowColor: "#4f46e5",
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
            style={{ position: "absolute", left: 16, top: 20, zIndex: 10 }}
          />
          <TextInput
            className="w-full bg-white/90 p-4 pl-12 rounded-2xl text-lg"
            placeholder="Password"
            placeholderTextColor="#94a3b8"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={{
              borderColor: !ok ? "#ef4444" : "#e0e7ff",
              borderWidth: 1,
              shadowColor: "#4f46e5",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
            }}
          />
        </View>

        <View className="relative">
          <Feather
            name="check-circle"
            size={20}
            color="#4f46e5"
            style={{ position: "absolute", left: 16, top: 20, zIndex: 10 }}
          />
          <TextInput
            className="w-full bg-white/90 p-4 pl-12 rounded-2xl text-lg"
            placeholder="Confirm Password"
            placeholderTextColor="#94a3b8"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            style={{
              borderColor: !ok ? "#ef4444" : "#e0e7ff",
              borderWidth: 1,
              shadowColor: "#4f46e5",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
            }}
          />
        </View>

        {!ok && (
          <Text className="text-red-500 text-sm mt-2">
            Passwords do not match!
          </Text>
        )}
      </View>

      {/* Signup Button */}
      <TouchableOpacity
        onPress={handleCreateAccount}
        style={{
          backgroundColor: "#4f46e5",
          padding: 20,
          borderRadius: 16,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 4,
        }}
      >
        <Text className="text-center text-white text-lg font-semibold tracking-wide">
          Create Account
        </Text>
      </TouchableOpacity>

      {/* Login Link */}
      <TouchableOpacity
        className="mt-6 self-center flex-row items-center"
        onPress={() => router.replace("/login")}
      >
        <Text className="text-gray-600 text-sm">Already have an account? </Text>
        <Text className="text-indigo-600 text-sm font-medium underline">
          Sign In
        </Text>
      </TouchableOpacity>

      {/* Decorative Elements */}
      <View className="absolute bottom-0 w-full flex-row justify-between opacity-20">
        <View className="w-32 h-32 rounded-full bg-indigo-300 -mb-16 -ml-16" />
        <View className="w-24 h-24 rounded-full bg-blue-300 -mr-12" />
      </View>
    </LinearGradient>
  );
}
export function SignUP() {}
