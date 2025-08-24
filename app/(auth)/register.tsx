// Register.tsx
import InputField from "@/components/InputField";
import { useNavigation } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [role, setRole] = useState<"jobseeker" | "employer">("jobseeker");
  const [cvFile, setCvFile] = useState<string | null>(null);

  const handleUploadCV = () => {
    // Here you can integrate react-native-document-picker or expo-document-picker
    // For now we simulate file picking
    setCvFile("resume.pdf");
    Alert.alert("CV Uploaded", "resume.pdf selected");
  };

  const handleRegister = () => {
    Alert.alert(
      "Register",
      JSON.stringify(
        {
          firstName,
          mobile,
          email,
          pin,
          address,
          city,
          role,
          cvFile,
        },
        null,
        2
      )
    );
  };
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
      >
        <Text>Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Register</Text>

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

      {/* Radio Buttons */}
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
            style={[styles.radioCircle, role === "employer" && styles.selected]}
          />
          <Text style={styles.radioText}>Employer</Text>
        </TouchableOpacity>
      </View>

      {/* Upload CV (only for job seekers) */}
      {role === "jobseeker" && (
        <TouchableOpacity style={styles.uploadBtn} onPress={handleUploadCV}>
          <Text style={styles.uploadText}>
            {cvFile ? `Uploaded: ${cvFile}` : "Upload CV"}
          </Text>
        </TouchableOpacity>
      )}

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitBtn} onPress={handleRegister}>
        <Text style={styles.submitText}>Register</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
  backBtn: {
    position: "absolute",
    top: 40,
    left: 20,
    padding: 10,
    backgroundColor: "#E5E7EB",
    borderRadius: 8,
    zIndex: 1,
  },
  radioLabel: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
  },
  radioGroup: {
    flexDirection: "row",
    marginTop: 8,
    marginBottom: 16,
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
    alignItems: "center",
    justifyContent: "center",
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
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
  uploadText: {
    color: "#374151",
    fontSize: 15,
  },
  submitBtn: {
    backgroundColor: "#3B82F6",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 40,
  },
  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
