import { useFetchUsersQuery } from "@/services/userApi";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  FlatList,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const EmployerHome = () => {
  const router = useRouter();
  const { data, isLoading, isFetching, refetch } = useFetchUsersQuery({});
  const [refreshing, setRefreshing] = useState(false);

  if (isLoading) {
    return (
      <View style={styles.center}>
        <Text>Loading job seekers...</Text>
      </View>
    );
  }

  const jobseekers = Array.isArray(data)
    ? data.filter((u: any) => u.role === "jobseeker")
    : [];

  const handleViewResume = async (item: any) => {
    // try several common resume keys
    const possible = ["cvUrl", "cv", "resumeUrl", "resume", "fileUrl", "cvFile"];
    let url: string | undefined;
    for (const key of possible) {
      const val = item[key];
      if (val && typeof val === "string") {
        url = val;
        break;
      }
      // sometimes nested object: { uri }
      if (val && typeof val === "object" && val.uri) {
        url = val.uri;
        break;
      }
    }

    if (!url) {
      Alert.alert("No resume", "This user has not uploaded a resume.");
      return;
    }

    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) await Linking.openURL(url);
      else Alert.alert("Can't open", "Unable to open resume URL.");
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to open resume.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.header}>Job Seekers</Text>
        <TouchableOpacity
          style={styles.createBtn}
          onPress={() => router.push("/(employer)/createPost")}
        >
          <Text style={styles.createText}>+ Create Post</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={jobseekers}
        keyExtractor={(item: any) => item._id || item.email || Math.random().toString()}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }: { item: any }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.firstName} {item.lastName ?? ''}</Text>
            <Text style={styles.email}>{item.email}</Text>
            <Text style={styles.meta}>City: {item.city ?? '—'}</Text>

            <View style={styles.actionsRow}>
              <TouchableOpacity
                style={styles.actionBtn}
                onPress={() => handleViewResume(item)}
              >
                <Text style={styles.actionText}>View Resume</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionBtn, styles.messageBtn]}
                onPress={() => Alert.alert('Contact', `Contact ${item.firstName}\n${item.email}`)}
              >
                <Text style={styles.actionText}>Contact</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        refreshing={isFetching || refreshing}
        onRefresh={async () => {
          setRefreshing(true);
          try {
            if (refetch) await refetch();
          } catch (e) {
            console.error(e);
          } finally {
            setRefreshing(false);
          }
        }}
        ListEmptyComponent={() => (
          <View style={styles.center}>
            <Text>No job seekers found.</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default EmployerHome;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },
  headerRow: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  header: { fontSize: 22, fontWeight: "700", color: "#111827" },
  createBtn: {
    backgroundColor: "#0EA5E9",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  createText: { color: "#fff", fontWeight: "600" },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  name: { fontSize: 18, fontWeight: "600", color: "#111827" },
  email: { fontSize: 14, color: "#4B5563", marginTop: 4 },
  meta: { fontSize: 14, marginTop: 6, color: "#6B7280" },
  actionsRow: { flexDirection: "row", marginTop: 12 },
  actionBtn: {
    backgroundColor: "#10B981",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 8,
  },
  messageBtn: { backgroundColor: "#3B82F6" },
  actionText: { color: "#fff", fontWeight: "600" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});