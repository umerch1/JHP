import { useApproveUserMutation, useFetchUsersQuery } from "@/services/userApi";
import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const AdminDashboard = () => {
  const { data: pendingUser, isLoading, refetch, isFetching } = useFetchUsersQuery({});
  const [refreshing, setRefreshing] = useState(false);
  const [approveUser, { isLoading: approving }] = useApproveUserMutation();

  if (isLoading) {
    return (
      <View style={styles.center}>
        <Text>Loading users...</Text>
      </View>
    );
  }

  const handleApprove = async (id: string) => {
    try {
      await approveUser(id).unwrap();
      alert("User approved successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to approve user");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Pending Users</Text>
      <Text>sdfds</Text>
      <FlatList
        data={pendingUser}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.firstName}</Text>
            <Text style={styles.email}>{item.email}</Text>
            <Text style={styles.role}>Role: {item.role}</Text>
            <Text style={styles.city}>City: {item.city}</Text>
            <Text style={styles.status}>Status: {item.status}</Text>

            <TouchableOpacity
              style={styles.approveBtn}
              onPress={() => handleApprove(item._id)}
              disabled={approving}
            >
              <Text style={styles.approveText}>
                {approving ? "Approving..." : "Approve"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        refreshing={isFetching || refreshing}
        onRefresh={async () => {
          setRefreshing(true);
          try {
            if (refetch) await refetch();
          } catch (e) {
            console.error("Refresh failed", e);
          } finally {
            setRefreshing(false);
          }
        }}
      />
    </View>
  );
};

export default AdminDashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    padding: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#111827",
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  name: { fontSize: 18, fontWeight: "600", color: "#111827" },
  email: { fontSize: 14, color: "#4B5563" },
  role: { fontSize: 14, marginTop: 4 },
  city: { fontSize: 14, marginTop: 2 },
  status: { fontSize: 14, marginTop: 2, color: "#DC2626" },
  approveBtn: {
    backgroundColor: "#10B981",
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  approveText: { color: "#fff", fontWeight: "600" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
