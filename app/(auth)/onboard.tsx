// Onboard.tsx
import { useNavigation } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Onboard = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Job Portal</Text>

      <TouchableOpacity
        style={styles.registerBtn}
        onPress={() => navigation.navigate("register")}
      >
        <Text style={styles.btnText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Onboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 40,
    color: "#111827",
  },
  registerBtn: {
    backgroundColor: "#3B82F6",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
