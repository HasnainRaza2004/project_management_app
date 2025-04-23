// app/(student)/tasks.tsx
import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Card, Text, Button, useTheme, Badge } from 'react-native-paper';
import { useRouter } from 'expo-router';

const allTasks = [
  { id: '101', title: 'Literature Review', project: 'Project Alpha', status: 'Pending', due: '2025-05-10' },
  { id: '102', title: 'Data Analysis', project: 'Project Alpha', status: 'Done', due: '2025-04-15' },
];

export default function TaskList() {
  const [filter, setFilter] = useState<'All' | 'Pending' | 'Done'>('All');
  const router = useRouter();
  const theme = useTheme();

  const filtered = filter === 'All' ? allTasks : allTasks.filter(t => t.status === filter);

  return (
    <View style={styles.container}>
      <View style={styles.filterRow}>
        {['All', 'Pending', 'Done'].map(f => (
          <Button
            key={f}
            mode={filter === f ? 'contained' : 'outlined'}
            onPress={() => setFilter(f as any)}
            style={styles.filterBtn}
          >
            {f}
          </Button>
        ))}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card} onPress={() => router.push(`/student/tasks/${item.id}`)}>
            <Card.Title
              title={item.title}
              subtitle={
                <View>
                  <Text style={styles.subtitle}>Project: {item.project}</Text>
                  <Text style={styles.subtitle}>Due: {item.due}</Text>
                </View>
              }
              right={() => (
                <Badge style={[styles.badge, item.status === 'Done' ? styles.done : styles.pending]}>
                  {item.status}
                </Badge>
              )}
            />
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  card: { marginBottom: 12 },
  subtitle: { fontSize: 13 },
  filterRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 16 },
  filterBtn: { flex: 1, marginHorizontal: 4 },
  badge: { alignSelf: 'center', marginRight: 16 },
  done: { backgroundColor: 'green', color: 'white' },
  pending: { backgroundColor: 'orange', color: 'white' },
});
