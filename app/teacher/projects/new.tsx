import React, { useState } from 'react';
import { View, StyleSheet, Alert, ScrollView, Modal, Pressable, Platform } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function NewProject() {
  const router = useRouter();

  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [studentCount, setStudentCount] = useState('');
  const [status, setStatus] = useState('');
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [statusModalVisible, setStatusModalVisible] = useState(false);

  const statusOptions = ['Active', 'Completed', 'Pending'];

  const handleCreate = () => {
    if (!projectName || !description || !studentCount || !status || !startDate) {
      Alert.alert('Validation', 'Please fill all fields.');
      return;
    }

    Alert.alert('Success', `Project "${projectName}" created successfully`);
    router.back();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🆕 Create New Project</Text>

      <TextInput
        label="Project Name"
        value={projectName}
        onChangeText={setProjectName}
        mode="outlined"
        style={styles.input}
        placeholder="e.g., AI Capstone"
      />

      <TextInput
        label="Description"
        value={description}
        onChangeText={setDescription}
        mode="outlined"
        multiline
        numberOfLines={4}
        style={styles.input}
        placeholder="Brief overview of the project"
      />

      <TextInput
        label="Number of Students"
        value={studentCount}
        onChangeText={setStudentCount}
        mode="outlined"
        keyboardType="numeric"
        style={styles.input}
        placeholder="e.g., 5"
      />

      <Pressable onPress={() => setStatusModalVisible(true)}>
        <TextInput
          label="Project Status"
          value={status}
          mode="outlined"
          editable={false}
          style={styles.input}
          pointerEvents="none"
        />
      </Pressable>

      {/* Status Selection Modal */}
      <Modal
        animationType="slide"
        transparent
        visible={statusModalVisible}
        onRequestClose={() => setStatusModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {statusOptions.map((option) => (
              <Pressable
                key={option}
                style={styles.modalOption}
                onPress={() => {
                  setStatus(option);
                  setStatusModalVisible(false);
                }}
              >
                <Text>{option}</Text>
              </Pressable>
            ))}
            <Button onPress={() => setStatusModalVisible(false)}>Cancel</Button>
          </View>
        </View>
      </Modal>

      <Pressable onPress={() => setShowDatePicker(true)}>
        <TextInput
          label="Start Date"
          value={startDate ? startDate.toDateString() : ''}
          mode="outlined"
          editable={false}
          style={styles.input}
          pointerEvents="none"
        />
      </Pressable>

      {/* Native Date Picker */}
      {showDatePicker && (
        <DateTimePicker
          value={startDate || new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setStartDate(selectedDate);
          }}
        />
      )}

      <Button
        mode="contained"
        onPress={handleCreate}
        style={styles.button}
        disabled={!projectName || !description || !studentCount || !status || !startDate}
      >
        Create Project
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 24,
    borderRadius: 6,
    paddingVertical: 6,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
  },
  modalOption: {
    padding: 12,
  },
});
