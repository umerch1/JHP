import Loader from "@/components/Loader";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useApplyJobMutation, useFetchJobsQuery } from "@/services";
import { RootState } from "@/store";
import { default as React, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";

function Jobs() {
  const { data: jobs = [], isLoading, isError, refetch } = useFetchJobsQuery();
  const [applyJob, { isLoading: applying }] = useApplyJobMutation();
  const user = useSelector((state: RootState) => state.auth.user);

  const [appliedIds, setAppliedIds] = useState<Record<string, boolean>>({});
  const [selectedJob, setSelectedJob] = useState<any | null>(null);

  const handleApply = async (jobId: string) => {
    try {
      await applyJob({ jobId, applicant: { userId: user?.id ?? user?._id ?? null, email: user?.email ?? null } }).unwrap();
      Alert.alert("Applied", "Your application has been submitted.");
      setAppliedIds((s) => ({ ...s, [jobId]: true }));
      refetch();
    } catch (err) {
      Alert.alert("Error", "Unable to apply. Please try again.");
    }
  };

  if (isLoading) return <Loader />;

  return (
    <ThemedView style={styles.container}>
      {jobs.length === 0 ? (
        <ThemedText style={styles.empty}>No jobs available</ThemedText>
      ) : (
        <FlatList
          data={jobs}
          keyExtractor={(item) => item.id ?? item._id ?? String(item.jobId)}
          renderItem={({ item }) => {
            const id = item.id ?? item._id ?? item.jobId ?? String(Math.random());
            const isApplied = appliedIds[id] || item.applied;
            const logoUri = item.logo || item.companyLogo || null;
            return (
              <TouchableOpacity activeOpacity={0.9} style={styles.card} onPress={() => setSelectedJob(item)}>
                <View style={styles.row}>
                  <View style={styles.avatarWrap}>
                    {logoUri ? (
                      <Image source={{ uri: logoUri }} style={styles.avatar} />
                    ) : (
                      <View style={styles.avatarPlaceholder}>
                        <ThemedText style={styles.avatarText}>{(item.company || item.employer || "").charAt(0)}</ThemedText>
                      </View>
                    )}
                  </View>

                  <View style={styles.content}>
                    <ThemedText type="title" style={styles.title}>{item.title ?? item.jobTitle}</ThemedText>
                    <ThemedText style={styles.company}>{item.company ?? item.employer} • {item.location}</ThemedText>
                    <View style={styles.metaRow}>
                      {item.type ? <ThemedText style={styles.tag}>{item.type}</ThemedText> : null}
                      {item.salary ? <ThemedText style={styles.tag}>₹{item.salary}</ThemedText> : null}
                    </View>
                  </View>

                  <View style={styles.actions}>
                    <TouchableOpacity
                      style={[styles.applyBtn, isApplied && styles.appliedBtn]}
                      onPress={() => handleApply(id)}
                      disabled={applying || isApplied}
                    >
                      {applying ? (
                        <ActivityIndicator color="#fff" />
                      ) : (
                        <ThemedText style={styles.applyText}>{isApplied ? "Applied" : "Apply"}</ThemedText>
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
          contentContainerStyle={{ padding: 16, paddingBottom: 48 }}
        />
      )}

      <Modal visible={!!selectedJob} animationType="slide" transparent={true} onRequestClose={() => setSelectedJob(null)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <ScrollView>
              <ThemedText type="title" style={{ marginBottom: 8 }}>{selectedJob?.title ?? selectedJob?.jobTitle}</ThemedText>
              <ThemedText style={{ marginBottom: 6 }}>{selectedJob?.company ?? selectedJob?.employer} • {selectedJob?.location}</ThemedText>
              <ThemedText style={{ marginBottom: 12 }}>{selectedJob?.description ?? selectedJob?.desc}</ThemedText>
            </ScrollView>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 12 }}>
              <TouchableOpacity style={styles.modalClose} onPress={() => setSelectedJob(null)}>
                <ThemedText>Close</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalApply}
                onPress={() => {
                  const id = selectedJob?.id ?? selectedJob?._id ?? selectedJob?.jobId;
                  setSelectedJob(null);
                  if (id) handleApply(id);
                }}
              >
                <ThemedText style={{ color: "#fff", fontWeight: "600" }}>Apply</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  empty: { margin: 20, textAlign: "center" },
  card: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  row: { flexDirection: "row", alignItems: "center" },
  avatarWrap: { width: 64, height: 64, marginRight: 12 },
  avatar: { width: 64, height: 64, borderRadius: 8, resizeMode: "cover" },
  avatarPlaceholder: { width: 64, height: 64, borderRadius: 8, backgroundColor: "#eef2ff", alignItems: "center", justifyContent: "center" },
  avatarText: { fontSize: 22, color: "#4F46E5", fontWeight: "700" },
  content: { flex: 1 },
  title: { fontSize: 16, fontWeight: "700", marginBottom: 4 },
  company: { fontSize: 13, color: "#666", marginBottom: 6 },
  metaRow: { flexDirection: "row" },
  tag: { fontSize: 12, color: "#0a7ea4", marginRight: 8 },
  actions: { marginLeft: 8, alignItems: "flex-end" },
  applyBtn: { backgroundColor: "#4F46E5", paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8 },
  appliedBtn: { backgroundColor: "#6b7280" },
  applyText: { color: "#fff", fontWeight: "600" },

  modalBackdrop: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "flex-end" },
  modalCard: { backgroundColor: "#fff", padding: 16, borderTopLeftRadius: 12, borderTopRightRadius: 12, maxHeight: "80%" },
  modalClose: { padding: 10 },
  modalApply: { backgroundColor: "#4F46E5", paddingVertical: 10, paddingHorizontal: 16, borderRadius: 8 },
});

export default Jobs;

