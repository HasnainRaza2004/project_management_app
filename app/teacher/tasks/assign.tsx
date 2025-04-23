import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Text, Button, Checkbox, Divider } from "react-native-paper";
import { useRouter } from "expo-router";

// Dummy Data
const dummyProjects = [
  { id: "1", name: "Project A" },
  { id: "2", name: "Project B" },
];
const dummyStudents = [
  { id: "s1", name: "Alice" },
  { id: "s2", name: "Bob" },
  { id: "s3", name: "Charlie" },
];

export default function AssignStudents() {
  const router = useRouter();
  const [assignments, setAssignments] = useState<Record<string, Set<string>>>(
    () => ({})
  );
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  // Toggle student assignment for a project
  const toggleStudent = (projectId: string, studentId: string) => {
    setAssignments((prev) => {
      const projectSet = new Set(prev[projectId] || []);
      if (projectSet.has(studentId)) {
        projectSet.delete(studentId);
      } else {
        projectSet.add(studentId);
      }
      return { ...prev, [projectId]: projectSet };
    });
  };

  // Toggle project expand/collapse
  const toggleProject = (projectId: string) => {
    setExpandedProject((prev) => (prev === projectId ? null : projectId));
  };

  const handleSave = () => {
    Alert.alert("Saved", "Student assignments updated");
    router.back();
  };

  // Render each project and its students as a single item
  const renderProjectItem = ({ item: project }: { item: { id: string; name: string } }) => (
    <View style={styles.projectSection}>
      <TouchableOpacity
        onPress={() => toggleProject(project.id)}
        style={styles.projectHeader}
      >
        <Text style={styles.projectName}>{project.name}</Text>
      </TouchableOpacity>

      {expandedProject === project.id && (
        <View style={styles.studentsContainer}>
          <FlatList
            data={dummyStudents}
            numColumns={3}
            keyExtractor={(student) => student.id}
            renderItem={({ item: student }) => (
              <View style={styles.studentItem}>
                <Checkbox
                  status={
                    assignments[project.id]?.has(student.id)
                      ? "checked"
                      : "unchecked"
                  }
                  onPress={() => toggleStudent(project.id, student.id)}
                />
                <Text style={styles.studentName}>{student.name}</Text>
              </View>
            )}
          />
        </View>
      )}

      <Divider style={styles.divider} />
    </View>
  );
  return (
    <FlatList
      data={dummyProjects}
      renderItem={renderProjectItem}
      keyExtractor={(project) => project.id}
      ListHeaderComponent={
        <Text style={styles.title}>Assign Students to Projects</Text>
      }
      ListFooterComponent={
        <Button mode="contained" onPress={handleSave} style={styles.button}>
          Save Assignments
        </Button>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 22, marginBottom: 20, textAlign: "center" },
  projectSection: { marginBottom: 20, marginHorizontal: 20 },
  projectHeader: {
    padding: 10,
    backgroundColor: "#6200ea",
    borderRadius: 8,
    marginBottom: 10,
  },
  projectName: { fontSize: 18, fontWeight: "bold", color: "#fff" },
  studentsContainer: { flexDirection: "row", flexWrap: "wrap" },
  studentItem: { width: "30%", alignItems: "center", marginBottom: 10 },
  studentName: { marginTop: 5, fontSize: 12, textAlign: "center" },
  button: { marginTop: 20, marginHorizontal: 20, backgroundColor: "#6200ea" },
  divider: { marginVertical: 10 },
});
