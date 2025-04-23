// app/(student)/projects.tsx
import React, { useState } from 'react';
import { FlatList, StyleSheet, View, TextInput as RNTextInput } from 'react-native';
import { Card, Text, TextInput, useTheme, Badge, ProgressBar, Button } from 'react-native-paper';
import { useRouter } from 'expo-router';

const allProjects = [
  { id: '1', title: 'Project Alpha', description: 'AI Research on Neural Networks', teacher: 'Dr. Smith', status: 'In Progress', assignedDate: '2024-04-01', dueDate: '2024-12-01', progress: 40 },
  { id: '2', title: 'Project Beta', description: 'Climate Change Impact Study', teacher: 'Prof. John', status: 'Completed', assignedDate: '2024-02-15', dueDate: '2024-10-30', progress: 100 },
  { id: '3', title: 'Project Gamma', description: 'Cybersecurity Research', teacher: 'Dr. Lee', status: 'On Hold', assignedDate: '2024-03-20', dueDate: '2024-09-30', progress: 10 },
];

export default function StudentProjects() {
  const [search, setSearch] = useState('');
  const theme = useTheme();
  const router = useRouter();

  const filteredProjects = allProjects.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <FlatList
      data={filteredProjects}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
      ListHeaderComponent={
        <View>
          <TextInput
            label="Search Projects"
            value={search}
            onChangeText={setSearch}
            mode="outlined"
            style={styles.input}
          />
          {filteredProjects.length === 0 && (
            <Text style={styles.noResults}>No projects found matching "{search}"</Text>
          )}
        </View>
      }
      renderItem={({ item }) => (
        <Card
          style={[styles.card, { backgroundColor: theme.colors.surface }]}
          onPress={() => router.push(`/student/projects/${item.id}`)}
        >
          <Card.Title
            title={item.title}
            subtitle={`Teacher: ${item.teacher} | Assigned: ${item.assignedDate}`}
            right={() => (
              <Badge style={{ margin: 8 }} size={24}>
                {item.status}
              </Badge>
            )}
          />
          <Card.Content>
            <Text>{item.description}</Text>
            <View style={styles.progressContainer}>
              <Text>Progress: {item.progress}%</Text>
              <ProgressBar progress={item.progress / 100} color={theme.colors.primary} style={styles.progressBar} />
            </View>
            <Text>Due Date: {item.dueDate}</Text>
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => router.push(`/student/projects/${item.id}`)} mode="contained">
              View Details
            </Button>
          </Card.Actions>
        </Card>
      )}
      ListEmptyComponent={
        <View style={styles.emptyStateContainer}>
          <Text>No projects available to display.</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  input: { marginBottom: 16 },
  card: { marginBottom: 16 },
  progressContainer: { marginVertical: 8 },
  progressBar: { height: 6, borderRadius: 3 },
  noResults: { marginTop: 8, fontStyle: 'italic', color: '#888' },
  emptyStateContainer: { alignItems: 'center', justifyContent: 'center', padding: 20 },
});
