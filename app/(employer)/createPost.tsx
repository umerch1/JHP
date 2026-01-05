import InputField from "@/components/InputField";
import Loader from "@/components/Loader";
import { useCreateJobMutation } from "@/services";
import { RootState } from "@/store";
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
import { useSelector } from "react-redux";

const CreatePost = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [loading, setLoading] = useState(false);
  const [createJob] = useCreateJobMutation();
  const user = useSelector((state: RootState) => state.auth.user);
  const employerId = user?.id ?? user?._id ?? null;

  const handleSubmit = async () => {
    if (!title || !description) {
      Alert.alert("Validation", "Please provide a title and description.");
      return;
    }

    setLoading(true);
    try {
      if (!employerId) {
        Alert.alert("Error", "Employer not found. Please login again.");
        return;
      }

      const payload = { title, description, location, salary, employmentType, employerId };
      const data = await createJob(payload).unwrap();
      Alert.alert("Success", data.message || "Job post created");
      router.replace("/(employer)/home");
    } catch (err: any) {
      console.error(err);
      const message = err?.data?.message || err?.error || err?.message || (typeof err === "string" ? err : JSON.stringify(err));
      Alert.alert("Error", message || "Failed to create post");
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