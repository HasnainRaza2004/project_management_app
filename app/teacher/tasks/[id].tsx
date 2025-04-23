import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, Button, ProgressBar, TextInput } from 'react-native-paper';
import { useRouter } from 'expo-router';

const task = {
  id: '1',
  title: 'Task 1',
  description: 'Complete the project milestone',
  progress: 50, // percent
};

export default function TaskDetails() {
  const router = useRouter();
  const [progress, setProgress] = useState(task.progress);
  const [status, setStatus] = useState('');
  const [description, setDescription] = useState(task.description);

  const handleSaveProgress = () => {
    Alert.alert('Progress Updated', `Progress is now at ${progress}%`);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{task.title}</Text>
      <Text style={styles.subtitle}>Description</Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        mode="outlined"
        multiline
        style={styles.input}
      />

      <Text style={styles.subtitle}>Progress</Text>
      <ProgressBar progress={progress / 100} color="green" style={styles.progressBar} />
      <Text>{progress}% completed</Text>

      <Button mode="contained" onPress={handleSaveProgress} style={styles.button}>
        Save Progress
      </Button>
      
      <Text style={styles.subtitle}>Status Update</Text>
      <TextInput
        value={status}
        onChangeText={setStatus}
        mode="outlined"
        style={styles.input}
        placeholder="Update status"
      />

      <Button mode="contained" onPress={() => Alert.alert('Status Updated', status)} style={styles.button}>
        Update Status
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, marginBottom: 10 },
  subtitle: { fontSize: 18, marginBottom: 5, marginTop: 15 },
  input: { marginBottom: 20 },
  progressBar: { marginBottom: 10 },
  button: { marginTop: 20 },
});
