import { Slot, Stack } from "expo-router";

export default function AuthLayout(){


    return (
        <>
        <Stack>

    <Stack.Screen name="login"options={{headerShown:false, gestureEnabled:false}}/>
    <Slot/>
        </Stack>
</>
    )
}