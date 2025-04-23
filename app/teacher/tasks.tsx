import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Text, Card, Button, IconButton } from "react-native-paper";
import { useRouter } from "expo-router";

const dummyTasks = [
  {
    id: "t1",
    title: "Draft Report",
    project: "Project A",
    student: "Alice",
    status: "Pending",
  },
  {
    id: "t2",
    title: "Code Review",
    project: "Project B",
    student: "Bob",
    status: "In Progress",
  },
];

export default function TaskList() {
  const router = useRouter();

  const renderTaskCard = ({ item }) => (
    <Card style={styles.card} onPress={() => router.push(`/teacher/tasks/${item.id}`)}>
      <Card.Title
        title={item.title}
        subtitle={`${item.project} • ${item.student}`}
        right={() => (
          <IconButton
            icon="eye"
            onPress={() => router.push(`/teacher/tasks/${item.id}`)}
          />
        )}
      />
      <Card.Content>
        <Text style={[styles.status, styles[`status_${item.status.toLowerCase().replace(' ', '')}`]]}>
          {item.status}
        </Text>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📋 Task List</Text>

      <FlatList
        data={dummyTasks}
        keyExtractor={(item) => item.id}
        renderItem={renderTaskCard}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      <Button
        mode="outlined"
        onPress={() => router.push("/teacher/tasks/assign")}
        style={styles.button}
      >
        Assign Students
      </Button>

      <Button
        mode="contained"
        onPress={() => router.push("/teacher/tasks/create")}
        style={[styles.button, { marginTop: 10 }]}
      >
        + New Task
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flex: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  card: {
    marginBottom: 16,
    borderRadius: 8,
    elevation: 2,
  },
  button: {
    marginTop: 20,
    borderRadius: 6,
    paddingVertical: 6,
  },
  status: {
    marginTop: 4,
    fontWeight: "600",
  },
  status_pending: {
    color: "#f39c12",
  },
  status_inprogress: {
    color: "#2980b9",
  },
  status_completed: {
    color: "#27ae60",
  },
});
