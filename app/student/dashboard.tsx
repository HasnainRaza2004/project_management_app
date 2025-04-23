// app/(student)/dashboard.tsx
import React from "react";
import { View, StyleSheet, ScrollView, Dimensions } from "react-native";
import { Text, Button, Card, useTheme } from "react-native-paper";
import { useRouter } from "expo-router";
import CustomBackButton from "@/components/CustomBackButton";
import DynamicDrawer from "@/components/Drawer";

const screenWidth = Dimensions.get("window").width;

export default function StudentDashboard() {
  const router = useRouter();
  const theme = useTheme();

  // Dummy data for counters
  const counters = [
    { label: "Projects", count: 45 },
    { label: "Tasks", count: 78 },
    { label: "Pending", count: 15 },
  ];

  const studentMenus = [
    { label: "Projects", icon: "clipboard-list-outline", route: "/student/projects" },
    { label: "Tasks", icon: "checkbox-marked-outline", route: "/student/tasks" },
    // You can add more menu items here...
  ];

  return (
    <View style={styles.mainContainer}>
      {/* Left Sidebar Drawer */}
      <DynamicDrawer userType="Student" menus={studentMenus} />

      {/* Dashboard Content */}
      <ScrollView style={styles.contentContainer}>
        <Text style={[styles.title, { color: theme.colors.primary }]}>
          Student Dashboard
        </Text>

        {/* Counters Section */}
        <View style={styles.countersContainer}>
          {counters.map((item, index) => (
            <Card
              key={index}
              style={[
                styles.counterCard,
                { backgroundColor: theme.colors.surface },
              ]}
            >
              <Card.Content>
                <Text
                  style={[styles.counterLabel, { color: theme.colors.text }]}
                >
                  {item.label}
                </Text>
                <Text
                  style={[styles.counterCount, { color: theme.colors.primary }]}
                >
                  {item.count}
                </Text>
              </Card.Content>
            </Card>
          ))}
        </View>

        {/* Charts Section */}
        <View style={styles.chartSection}>
          {/* Line Chart Card */}
          <Card
            style={[
              styles.chartCard,
              { backgroundColor: theme.colors.surface },
            ]}
          >
            <Card.Title
              title="Monthly Activity"
              titleStyle={{ color: theme.colors.primary }}
            />
            <Card.Content>
              <View
                style={[
                  styles.chartPlaceholder,
                  { backgroundColor: theme.colors.accent },
                ]}
              >
                <Text style={{ color: theme.colors.primary }}>
                  Line Chart Placeholder
                </Text>
                {/*
                Uncomment and add chart integration here:
                */}
              </View>
            </Card.Content>
          </Card>

          {/* Pie Chart Card */}
          <Card
            style={[
              styles.chartCard,
              { marginTop: 20, backgroundColor: theme.colors.surface },
            ]}
          >
            <Card.Title
              title="Task Distribution"
              titleStyle={{ color: theme.colors.primary }}
            />
            <Card.Content>
              <View
                style={[
                  styles.chartPlaceholder,
                  { backgroundColor: theme.colors.accent },
                ]}
              >
                <Text style={{ color: theme.colors.primary }}>
                  Pie Chart Placeholder
                </Text>
                {/*
                Uncomment and add chart integration here:
                */}
              </View>
            </Card.Content>
          </Card>
        </View>

        {/* Navigation Buttons */}
        {/* <View style={styles.navButtons}>
          <Button
            mode="contained"
            onPress={() => router.push("/admin/users")}
            style={[styles.navButton, { backgroundColor: theme.colors.primary }]}
          >
            Manage Users
          </Button>
          <Button
            mode="contained"
            onPress={() => router.push("/admin/setting")}
            style={[styles.navButton, { backgroundColor: theme.colors.primary }]}
          >
            System Settings
          </Button>
        </View> */}
      </ScrollView>
    </View>
  );
}

export const unstable_settings = {
  title: "Dashboard",
  headerLeft: () => <CustomBackButton />,
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "row", // Sidebar on left, content on right
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    marginVertical: 10,
    textAlign: "center",
    fontWeight: "600",
  },
  countersContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginTop: 10,
  },
  counterCard: {
    width: "47%",
    marginBottom: 15,
    borderRadius: 8,
    elevation: 3,
  },
  counterLabel: {
    fontSize: 16,
  },
  counterCount: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 5,
  },
  chartSection: {
    marginBottom: 20,
    paddingBottom: 20,
  },
  chartCard: {
    borderRadius: 8,
    elevation: 3,
    padding: 10,
  },
  chartPlaceholder: {
    height: 220,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderStyle: "dashed",
    borderRadius: 8,
    marginVertical: 10,
  },
  navButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 30,
  },
  navButton: {
    marginHorizontal: 5,
    flex: 1,
  },
});
