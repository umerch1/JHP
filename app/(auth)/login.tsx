import { useUserLoginMutation } from "@/services/userApi";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { OtpInput } from "react-native-otp-entry";
import { useSelector } from "react-redux";

const Login = () => {
  const [userLogin, { data, isLoading, error }] = useUserLoginMutation();
  const email = useSelector((state: any) => state.auth.email);
  console.log("Email from Redux:", email);
  console.log("Login response data:", data, error);
  const [otp, setOtp] = useState("");
  const router = useRouter();
  const handleLogin = () => {
    if (otp.length === 4) {
      userLogin({ email: "ranatayyab3737@gmail.com", pin: otp });
      // router.push("/(admin)/home");
    } else {
      Alert.alert("Error", "Please enter a 6-digit PIN");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔒 Enter PIN</Text>

      <View style={styles.otpContainer}>
        <OtpInput
          numberOfDigits={4}
          focusColor="#4CAF50"
          onTextChange={(text) => setOtp(text)}
          onFilled={(text) => setOtp(text)}
          theme={{
            containerStyle: styles.otpBox,
            pinCodeContainerStyle: styles.pinCodeBox,
            pinCodeTextStyle: styles.pinCodeText,
          }}
        />
      </View>

      <TouchableOpacity style={styles.buttonStyle} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 30, color: "#333" },
  otpContainer: { marginBottom: 40, width: "80%", alignItems: "center" },
  otpBox: { gap: 10 },
  pinCodeBox: {
    borderWidth: 1.5,
    borderColor: "#ccc",
    borderRadius: 10,
    width: 50,
    height: 60,
  },
  pinCodeText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  buttonStyle: {
    width: "60%",
    height: 50,
    borderRadius: 12,
    backgroundColor: "#4CAF50",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: { fontSize: 18, color: "#fff", fontWeight: "600" },
});
