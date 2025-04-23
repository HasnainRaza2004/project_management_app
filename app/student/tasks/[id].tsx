// app/(student)/tasks/[id].tsx
import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text, Modal, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import * as DocumentPicker from 'expo-document-picker';

export default function TaskDetail() {
  const { id } = useLocalSearchParams();
  const [remarks, setRemarks] = useState('');
  const [status, setStatus] = useState('Pending');
  const [modalVisible, setModalVisible] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleUpdate = () => {
    console.log(`Task ${id} updated with status: ${status}, remarks: ${remarks}, file: ${fileName}`);
  };

  const handleUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true,
      });

      if (result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        setUploaded(true);
        setFileName(file.name);
        console.log('File selected:', file);
      }
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task ID: {id}</Text>

      <Text style={styles.label}>Remarks</Text>
      <TextInput
        value={remarks}
        onChangeText={setRemarks}
        style={styles.input}
        multiline
        placeholder="Write your remarks..."
      />

      <TouchableOpacity style={styles.statusBtn} onPress={() => setModalVisible(true)}>
        <Text>Status: {status}</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            {['Pending', 'In Progress', 'Done'].map((opt) => (
              <TouchableOpacity
                key={opt}
                style={styles.option}
                onPress={() => {
                  setStatus(opt);
                  setModalVisible(false);
                }}
              >
                <Text>{opt}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      <TouchableOpacity style={styles.uploadBtn} onPress={handleUpload}>
        <Text>{uploaded ? `Uploaded ✅ (${fileName})` : 'Upload Submission'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.saveBtn} onPress={handleUpdate}>
        <Text style={styles.saveText}>Save Updates</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  label: { marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 6,
    padding: 10,
    marginBottom: 16,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  statusBtn: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 6,
    marginBottom: 16,
    backgroundColor: '#f2f2f2',
  },
  uploadBtn: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#1e90ff',
    borderRadius: 6,
    marginBottom: 16,
    backgroundColor: '#e6f0ff',
    alignItems: 'center',
  },
  saveBtn: {
    padding: 14,
    borderRadius: 6,
    backgroundColor: '#1e90ff',
    alignItems: 'center',
  },
  saveText: { color: '#fff', fontWeight: 'bold' },

  // Modal
  modalBackground: {
    flex: 1,
    backgroundColor: '#00000066',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: 250,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 10,
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});
