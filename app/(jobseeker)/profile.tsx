import React from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Loader from "@/components/Loader";

const Profile = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) {
    return <Loader text="Loading profile..." />;
  }

  const fullName = `${user.firstName || ""} ${user.lastName || ""}`.trim();
  const initials = (user.firstName ? user.firstName[0] : "") + (user.lastName ? user.lastName[0] : "");

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View style={styles.avatarWrap}>
            {user.avatar || user.picture ? (
              <Image source={{ uri: user.avatar || user.picture }} style={styles.avatar} />
            ) : (
              <View style={styles.initials}><ThemedText style={styles.initialsText} type="title">{initials || "U"}</ThemedText></View>
            )}
          </View>
          <View style={styles.titleWrap}>
            <ThemedText type="title">{fullName || "Unnamed User"}</ThemedText>
            <ThemedText type="subtitle">{user.role || "User"}</ThemedText>
          </View>
        </View>

        <View style={styles.row}>
          <ThemedText style={styles.label}>Email</ThemedText>
          <ThemedText>{user.email || "—"}</ThemedText>
        </View>

        <View style={styles.row}>
          <ThemedText style={styles.label}>Phone</ThemedText>
          <ThemedText>{user.mobile || user.phone || "—"}</ThemedText>
        </View>

        <View style={styles.row}>
          <ThemedText style={styles.label}>Address</ThemedText>
          <ThemedText>{user.address || "—"}</ThemedText>
        </View>

        <View style={styles.row}>
          <ThemedText style={styles.label}>Status</ThemedText>
          <ThemedText>{user.status || "—"}</ThemedText>
        </View>
      </ScrollView>
    </ThemedView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20 },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 24 },
  avatarWrap: { marginRight: 16 },
  avatar: { width: 86, height: 86, borderRadius: 86 / 2 },
  initials: {
    width: 86,
    height: 86,
    borderRadius: 86 / 2,
    backgroundColor: "#e2e8f0",
    alignItems: "center",
    justifyContent: "center",
  },
  initialsText: { color: "#111827" },
  titleWrap: { flex: 1 },
  row: { marginBottom: 16 },
  label: { marginBottom: 6, fontWeight: "600" },
});
