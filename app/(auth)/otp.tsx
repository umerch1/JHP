import { useUserLoginMutation } from "@/services/userApi";
import { setrole, setUser } from "@/slices/authSlice";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { OtpInput } from "react-native-otp-entry";
import { useDispatch, useSelector } from "react-redux";

const Otp = () => {
  const [userLogin, { data, isLoading, error, isSuccess }] =
    useUserLoginMutation();
  const dispatch = useDispatch();
  const email = useSelector((state: any) => state.auth.email);
  const [otp, setOtp] = useState("");
  const router = useRouter();
  const isLoggedIn = useSelector((state: any) => state.auth.user);
  const role = useSelector((state: any) => state.auth.role);
  // Watch for success or error updates
useEffect(() => {
  if (isSuccess && data) {
    Alert.alert("✅ Success", data.message || "Login successful");

    dispatch(setUser(data.user));
    dispatch(setrole(data.user.role));
  }

  if (error) {
    const errMsg =
      (error as any)?.data?.error ||
      (error as any)?.error ||
      "Login failed";

    Alert.alert("❌ Error", errMsg);
  }
}, [isSuccess, data, error]);

useEffect(() => {
  if (!isLoggedIn || !role) return;

  console.log("Navigating with role:", role);

  if (role === "admin") {
    router.replace("/(admin)/home");
  } else if (role === "jobseeker") {
    router.replace("/(jobseeker)/home");
  } else if (role === "employer") {
    router.replace("/(employer)/home");
  }
}, [isLoggedIn, role]);


  const handleLogin = async () => {
    if (otp.length === 4) {
      try {
        console.log("email_____",email,otp)
        await userLogin({ email, pin: otp }).unwrap();
      } catch (err: any) {
        const errMsg = err?.data?.error || "Something went wrong";
        console.log("errMsg",err)
        Alert.alert("❌ Error", errMsg);
      }
    } else {
      Alert.alert("Error", "Please enter a 4-digit PIN");
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

      <TouchableOpacity
        style={[styles.buttonStyle, isLoading && { opacity: 0.6 }]}
        onPress={handleLogin}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? "Logging in..." : "Login"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Otp;

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
