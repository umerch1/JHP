import InputField from "@/components/InputField";
import Loader from "@/components/Loader";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CreatePost = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title || !description) {
      Alert.alert("Validation", "Please provide a title and description.");
      return;
    }

    setLoading(true);
    try {
      const payload = { title, description, location, salary, employmentType };
      // Backend base URL (matches services/userApi.ts)
      const res = await fetch("http://192.168.2.107:5000/api/jobs/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || data?.message || "Request failed");

      Alert.alert("Success", data.message || "Job post created");
      router.replace("/(employer)/home");
    } catch (err: any) {
      console.error(err);
      Alert.alert("Error", err?.message || "Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {loading ? (
        <Loader />
      ) : (
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>Create Job Post</Text>

          <InputField label="Job Title" value={title} onChangeText={setTitle} placeholder="e.g. Senior React Native Dev" />

          <InputField
            label="Description"
            value={description}
            onChangeText={setDescription}
            placeholder="Describe the role, responsibilities"
            multiline
          />

          <InputField label="Location" value={location} onChangeText={setLocation} placeholder="City, remote, etc." />

          <InputField label="Salary" value={salary} onChangeText={setSalary} placeholder="e.g. 30k-40k" />

          <InputField label="Employment Type" value={employmentType} onChangeText={setEmploymentType} placeholder="Full-time / Part-time" />

          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
            <Text style={styles.submitText}>Post Job</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default CreatePost;

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 20, fontWeight: "700", marginBottom: 12 },
  submitBtn: {
    backgroundColor: "#0EA5E9",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },
  submitText: { color: "#fff", fontWeight: "700" },
});