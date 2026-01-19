import { logout } from "@/slices/authSlice";
import { router } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";

const Logout = () => {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      {/* Logo / Illustration */}
      <Image
        source={{
          uri: "https://cdn-icons-png.flaticon.com/512/1828/1828479.png",
        }}
        style={styles.image}
      />

      {/* Title */}
      <Text style={styles.title}>Are you sure you want to logout?</Text>
      <Text style={styles.subtitle}>
        You’ll need to log in again to access your account.
      </Text>

      {/* Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.cancelButton}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => {
            dispatch(logout());
            router.replace("/(auth)/login");
          }}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Logout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1E293B",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 15,
  },
  cancelButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "#E2E8F0",
    borderRadius: 10,
  },
  cancelText: {
    color: "#334155",
    fontSize: 16,
    fontWeight: "600",
  },
  logoutButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "#EF4444",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
