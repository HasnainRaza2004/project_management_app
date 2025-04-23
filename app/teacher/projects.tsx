import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Card, IconButton, useTheme, FAB, Badge } from 'react-native-paper';
import { useRouter } from 'expo-router';

export default function TeacherProjects() {
  const router = useRouter();
  const theme = useTheme();

  const [projects, setProjects] = useState([
    {
      id: '1',
      name: 'AI Research Project',
      description: 'A deep learning based approach to image classification.',
      createdAt: '2025-04-01',
      studentCount: 5,
      status: 'Active',
    },
    {
      id: '2',
      name: 'Climate Change Study',
      description: 'Analyzing the impact of urbanization on climate.',
      createdAt: '2025-03-15',
      studentCount: 8,
      status: 'Completed',
    },
  ]);

  const renderItem = ({ item }: { item: typeof projects[0] }) => (
    <Card style={styles.card} onPress={() => router.push(`/teacher/projects/${item.id}`)}>
      <Card.Title
        title={item.name}
        subtitle={`Created: ${item.createdAt}`}
        right={() => (
          <View style={styles.statusRight}>
            <Badge
              style={{
                backgroundColor: item.status === 'Completed' ? theme.colors.secondary : theme.colors.primary,
              }}
            >
              {item.status}
            </Badge>
            <IconButton icon="eye-outline" onPress={() => router.push(`/teacher/projects/${item.id}`)} />
          </View>
        )}
      />
      <Card.Content>
        <Text>{item.description}</Text>
        <Text style={styles.metaText}>👥 {item.studentCount} Students Assigned</Text>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📂 My Projects</Text>

      {projects.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No projects available. Start by creating one.</Text>
        </View>
      ) : (
        <FlatList
          data={projects}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
        />
      )}

      <FAB
        icon="plus"
        label="New Project"
        style={styles.fab}
        onPress={() => router.push('/teacher/projects/new')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    paddingTop: 30,
    marginBottom: 10,
    color: '#333',
  },
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    elevation: 2,
  },
  metaText: {
    marginTop: 8,
    fontSize: 14,
    color: '#666',
  },
  fab: {
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 0,
    borderRadius: 30,
  },
  listContent: {
    paddingBottom: 80,
  },
  statusRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginRight: 4,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
  },
});
