import { Stack } from "expo-router";
import { useSelector } from "react-redux";

export default function TabLayout() {
  const email = useSelector((state: any) => state.auth.email);
  return (
    <Stack
      initialRouteName={email ? "otp" : "onboard"}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="onboard"
        options={{
          title: "Onboard",
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          title: "login",
        }}
      />
      <Stack.Screen
        name="otp"
        options={{
          title: "OTP Verification",
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          title: "Register",
        }}
      />
    </Stack>
  );
}
