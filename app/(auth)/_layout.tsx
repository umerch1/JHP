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
        name="register"
        options={{
          title: "Register",
        }}
      />
    </Stack>
  );
}
