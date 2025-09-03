// components/Loader.tsx
import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

const Loader = ({ text = "Loading..." }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#4F46E5" />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white", // full page background
  },
  text: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
});

export default Loader;
