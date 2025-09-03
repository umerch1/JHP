import { Stack } from "expo-router";

export default function TabLayout() {
  return (
    <Stack
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
        name="register"
        options={{
          title: "Register",
        }}
      />
    </Stack>
  );
}
