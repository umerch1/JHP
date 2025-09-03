import InputField from "@/components/InputField";
import Loader from "@/components/Loader";
import { useRegisterUserMutation } from "@/services";
import { setemail } from "@/slices/authSlice";
import * as DocumentPicker from "expo-document-picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";

const Register = () => {
  type CvFileType = DocumentPicker.DocumentPickerAsset | null;
  const [firstName, setFirstName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [role, setRole] = useState<"jobseeker" | "employer">("jobseeker");
  const [cvFile, setCvFile] = useState<CvFileType | null>(null);
  const router = useRouter();
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const handleUploadCV = async (): Promise<void> => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: true,
      });

      if (result.assets && result.assets.length > 0) {
        setCvFile(result.assets[0]);
        Alert.alert("CV Uploaded", `${result.assets[0].name} selected`);
      } else {
        Alert.alert("Cancelled", "No file selected");
      }
    } catch (err) {
      Alert.alert("Error", "Something went wrong while picking the file.");
      console.log(err);
    }
  };
  const dispatch = useDispatch();
  const handleRegister = async () => {
    try {
      const payload = {
        firstName,
        mobile,
        email,
        pin,
        address,
        city,
        role,
      };

      const response = await registerUser(payload).unwrap();
      dispatch(setemail(email));
      console.log("Registration successful:", response);
      Alert.alert("Success", response.message);
      router.push("/(auth)/login");
    } catch (err: any) {
      Alert.alert("Registration Failed", err?.data?.error || "Unknown error");
      console.log("Registration error:", err);
    }
  };

  return (
    <View style={styles.container}>
      {isLoading && <Loader />}

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>📝 Register</Text>

        <InputField
          label="First Name"
          value={firstName}
          onChangeText={setFirstName}
          placeholder="Enter first name"
        />

        <InputField
          label="Mobile No"
          value={mobile}
          onChangeText={setMobile}
          placeholder="03xxxxxxxxx"
          keyboardType="phone-pad"
        />

        <InputField
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="you@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <InputField
          label="Pin (4-digit)"
          value={pin}
          onChangeText={setPin}
          placeholder="****"
          keyboardType="number-pad"
          maxLength={4}
          secureTextEntry
        />

        <InputField
          label="Address"
          value={address}
          onChangeText={setAddress}
          placeholder="Enter your address"
        />

        <InputField
          label="City"
          value={city}
          onChangeText={setCity}
          placeholder="Enter city"
        />

        {/* Role Selection */}
        <Text style={styles.radioLabel}>Select Role</Text>
        <View style={styles.radioGroup}>
          <TouchableOpacity
            style={styles.radioOption}
            onPress={() => setRole("jobseeker")}
          >
            <View
              style={[
                styles.radioCircle,
                role === "jobseeker" && styles.selected,
              ]}
            />
            <Text style={styles.radioText}>Job Seeker</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.radioOption}
            onPress={() => setRole("employer")}
          >
            <View
              style={[
                styles.radioCircle,
                role === "employer" && styles.selected,
              ]}
            />
            <Text style={styles.radioText}>Employer</Text>
          </TouchableOpacity>
        </View>

        {/* Upload CV */}
        {role === "jobseeker" && (
          <TouchableOpacity style={styles.uploadBtn} onPress={handleUploadCV}>
            <Text style={styles.uploadText}>
              {cvFile ? `📄 ${cvFile.name}` : "Upload CV"}
            </Text>
          </TouchableOpacity>
        )}

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitBtn} onPress={handleRegister}>
          <Text style={styles.submitText}>Register</Text>
        </TouchableOpacity>

        {/* Login Redirect */}
        <TouchableOpacity
          style={styles.loginRedirect}
          onPress={() => router.push("/(auth)/login")}
        >
          <Text style={styles.loginText}>
            Already have an account?{" "}
            <Text style={styles.loginHighlight}>Login</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  scrollContent: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#333",
  },
  radioLabel: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    alignSelf: "flex-start",
  },
  radioGroup: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 20,
    alignSelf: "flex-start",
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#3B82F6",
    marginRight: 6,
  },
  selected: {
    backgroundColor: "#3B82F6",
  },
  radioText: {
    fontSize: 15,
    color: "#111827",
  },
  uploadBtn: {
    backgroundColor: "#E5E7EB",
    padding: 14,
    borderRadius: 12,
    marginBottom: 24,
    width: "100%",
    alignItems: "center",
  },
  uploadText: {
    color: "#374151",
    fontSize: 16,
    fontWeight: "500",
  },
  submitBtn: {
    backgroundColor: "#3B82F6",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  submitText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  loginRedirect: {
    marginTop: 10,
  },
  loginText: {
    fontSize: 15,
    color: "#374151",
  },
  loginHighlight: {
    color: "#3B82F6",
    fontWeight: "600",
  },
});
