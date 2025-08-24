// app/_layout.tsx
import { Drawer } from "expo-router/drawer";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="dark" />
      <Drawer
        screenOptions={{
          headerStyle: { backgroundColor: "#4A90E2" },
          headerTintColor: "#fff",
          drawerActiveTintColor: "#4A90E2",
          drawerLabelStyle: { fontSize: 16 },
        }}
      >
        <Drawer.Screen
          name="home/index"
          options={{ drawerLabel: "Home", title: "The Job Hunting Portal App" }}
        />
        <Drawer.Screen
          name="home/profile"
          options={{ drawerLabel: "Profile" }}
        />
        <Drawer.Screen name="home/jobs" options={{ drawerLabel: "Jobs" }} />
        <Drawer.Screen
          name="home/settings"
          options={{ drawerLabel: "Settings" }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
