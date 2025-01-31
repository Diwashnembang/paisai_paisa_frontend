import { router, Slot, Stack } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
  useEffect(()=>{
  router.replace("/(auth)/login")
  console.log("hello world")
  },[])
  return (
  <Slot/>
  );
}
