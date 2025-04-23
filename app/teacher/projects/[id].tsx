import React, { useState } from 'react';
import { View, StyleSheet, Alert, Pressable, Modal, Platform } from 'react-native';
import { TextInput, Button, Text, Title, Caption } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function ProjectDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  // Initial dummy data
  const [projectName, setProjectName] = useState(`Project ${id}`);
  const [projectDescription, setProjectDescription] = useState('Project description goes here...');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [status, setStatus] = useState('In Progress');
  const [isActive, setIsActive] = useState(true);

  // For modal visibility and options
  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const statusOptions = ['In Progress', 'Completed', 'On Hold', 'Cancelled'];

  // For DateTimePicker visibility
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDateField, setSelectedDateField] = useState(null); // Track which date field is selected (start or end)

  const handleSave = () => {
    Alert.alert('Saved', `Project "${projectName}" updated successfully`);
    router.back();
  };

  const handleDelete = () => {
    Alert.alert('Confirm Delete', 'Are you sure you want to delete this project?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          Alert.alert('Deleted', 'Project deleted successfully');
          router.back();
        },
      },
    ]);
  };

  const openDatePicker = (field: 'start' | 'end') => {
    setSelectedDateField(field);
    setShowDatePicker(true);
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Project Details</Title>

      <TextInput
        label="Project Name"
        value={projectName}
        onChangeText={setProjectName}
        mode="outlined"
        style={styles.input}
      />

      <TextInput
        label="Project Description"
        value={projectDescription}
        onChangeText={setProjectDescription}
        mode="outlined"
        multiline
        style={[styles.input, { minHeight: 100, textAlignVertical: 'top' }]}
      />

      <View style={styles.dateRow}>
        <View style={styles.dateContainer}>
          <Caption>Start Date</Caption>
          <Pressable onPress={() => openDatePicker('start')}>
            <TextInput
              label="Start Date"
              value={startDate.toLocaleDateString()}
              mode="outlined"
              style={styles.input}
              editable={false}
            />
          </Pressable>
        </View>

        <View style={styles.dateContainer}>
          <Caption>End Date</Caption>
          <Pressable onPress={() => openDatePicker('end')}>
            <TextInput
              label="End Date"
              value={endDate.toLocaleDateString()}
              mode="outlined"
              style={styles.input}
              editable={false}
            />
          </Pressable>
        </View>
      </View>

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

      {showDatePicker && (
        <DateTimePicker
          value={selectedDateField === 'start' ? startDate : endDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              if (selectedDateField === 'start') {
                setStartDate(selectedDate);
              } else {
                setEndDate(selectedDate);
              }
            }
          }}
        />
      )}

      <Button mode="contained" onPress={handleSave} style={styles.button}>
        Save Changes
      </Button>
      <Button mode="outlined" onPress={handleDelete} style={[styles.button, styles.deleteButton]}>
        Delete Project
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: { marginBottom: 20 },
  button: { marginBottom: 10 },
  deleteButton: { borderColor: 'red' },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dateContainer: { flex: 1, marginHorizontal: 5 },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  modalOption: {
    padding: 10,
    marginVertical: 5,
  },
});
