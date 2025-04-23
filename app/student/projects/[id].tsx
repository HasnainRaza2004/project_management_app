// app/(student)/projects/[id].tsx
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Card, Text, ProgressBar, useTheme, Badge } from 'react-native-paper';
import { useLocalSearchParams, useRouter } from 'expo-router';

const allProjects = [
  {
    id: '1',
    title: 'Project Alpha',
    description: 'AI Research',
    teacher: 'Dr. Smith',
    status: 'In Progress',
    assignedDate: '2024-04-01',
    deadline: '2024-05-15',
  },
  {
    id: '2',
    title: 'Project Beta',
    description: 'Climate Study',
    teacher: 'Prof. John',
    status: 'Completed',
    assignedDate: '2024-02-15',
    deadline: '2024-03-30',
  },
];

const taskList = [
  { id: '101', title: 'Literature Review', status: 'Done' },
  { id: '102', title: 'Data Collection', status: 'In Progress' },
  { id: '103', title: 'Data Analysis', status: 'Pending' },
];

export default function ProjectDetail() {
  const { id } = useLocalSearchParams();
  const theme = useTheme();
  const router = useRouter();

  const project = allProjects.find(p => p.id === id);
  const completedTasks = taskList.filter(t => t.status === 'Done').length;
  const progress = taskList.length > 0 ? completedTasks / taskList.length : 0;

  if (!project) {
    return (
      <View style={styles.container}>
        <Text>Project not found.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={taskList}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
      ListHeaderComponent={
        <View style={styles.header}>
          <Text style={styles.title}>{project.title}</Text>
          <Text style={styles.subtitle}>Teacher: {project.teacher}</Text>
          <Text style={styles.date}>Assigned: {project.assignedDate}</Text>
          <Text style={styles.date}>Deadline: {project.deadline}</Text>
          <Text style={styles.description}>{project.description}</Text>
          <View style={styles.badgeRow}>
            <Badge style={styles.badge}>{project.status}</Badge>
          </View>
          <Text style={styles.notes}>Teacher Notes: Please submit tasks weekly.</Text>
          <ProgressBar progress={progress} color={theme.colors.primary} style={styles.progress} />
        </View>
      }
      renderItem={({ item }) => (
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]} onPress={() => router.push(`/student/tasks/${item.id}`)}>
          <Card.Title title={item.title} subtitle={`Status: ${item.status}`} />
        </Card>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  header: { marginBottom: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 4 },
  subtitle: { fontSize: 16, color: '#555', marginBottom: 2 },
  date: { fontSize: 14, color: '#777', marginBottom: 4 },
  description: { fontSize: 15, marginBottom: 8 },
  badgeRow: { flexDirection: 'row', marginBottom: 8 },
  badge: { marginRight: 8 },
  notes: { fontStyle: 'italic', marginBottom: 12 },
  progress: { height: 10, borderRadius: 5, marginBottom: 16 },
  card: { marginBottom: 12 },
});
