import { jsonRespone } from "@/types";
import {  useEffect, useState } from "react";
import { Text, TouchableOpacity, View ,TextInput, Button, StyleSheet} from "react-native";
import * as SecureStore from "expo-secure-store"
import useStore from "@/hooks/useStore";
import { router } from "expo-router";

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
    <View style={styles.container}>
      <Text style={styles.title}>Paisai Paisa</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#666"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#666"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 40,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

