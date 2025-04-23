import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import { useRouter } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";

// Dummy Data
const dummyProjectsBrief = [
  { label: "Project A", value: "1" },
  { label: "Project B", value: "2" },
];
const dummyStudentsList = [
  { label: "Alice", value: "s1" },
  { label: "Bob", value: "s2" },
];
const dummyPriorityLevels = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
];

export default function CreateTask() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectId, setProjectId] = useState<string>("");
  const [studentId, setStudentId] = useState<string>("");
  const [priority, setPriority] = useState<string>("medium");
  const [dueDate, setDueDate] = useState(new Date());
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const handleCreate = () => {
    if (!title.trim() || !projectId || !studentId) {
      Alert.alert("Validation", "Please fill all required fields.");
      return;
    }
    Alert.alert("Created", `Task "${title}" assigned`);
    router.back();
  };

  const renderDropdown = (
    items: { label: string; value: string }[],
    onSelect: (val: string) => void
  ) => (
    <FlatList
      data={items}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.option}
          onPress={() => {
            onSelect(item.value);
            setActiveDropdown(null);
          }}
        >
          <Text>{item.label}</Text>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.value}
      style={styles.list}
    />
  );

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    setDatePickerVisible(false); // Close the picker after selection
    setDueDate(selectedDate || dueDate);
  };

  const renderForm = () => {
    const formFields = [
      {
        label: "Task Title",
        renderInput: (
          <TextInput
            label="Task Title"
            value={title}
            onChangeText={setTitle}
            mode="outlined"
            style={styles.input}
          />
        ),
      },
      {
        label: "Description",
        renderInput: (
          <TextInput
            label="Description"
            value={description}
            onChangeText={setDescription}
            mode="outlined"
            multiline
            style={[styles.input, { minHeight: 100, textAlignVertical: "top" }]}
          />
        ),
      },
      {
        label: "Select Project",
        renderInput: (
          <TouchableOpacity
            style={styles.selector}
            onPress={() =>
              setActiveDropdown((prev) =>
                prev === "project" ? null : "project"
              )
            }
          >
            <Text>
              {dummyProjectsBrief.find((p) => p.value === projectId)?.label ||
                "Choose project..."}
            </Text>
          </TouchableOpacity>
        ),
        dropdown:
          activeDropdown === "project" &&
          renderDropdown(dummyProjectsBrief, setProjectId),
      },
      {
        label: "Select Student",
        renderInput: (
          <TouchableOpacity
            style={styles.selector}
            onPress={() =>
              setActiveDropdown((prev) =>
                prev === "student" ? null : "student"
              )
            }
          >
            <Text>
              {dummyStudentsList.find((s) => s.value === studentId)?.label ||
                "Choose student..."}
            </Text>
          </TouchableOpacity>
        ),
        dropdown:
          activeDropdown === "student" &&
          renderDropdown(dummyStudentsList, setStudentId),
      },
      {
        label: "Priority",
        renderInput: (
          <TouchableOpacity
            style={styles.selector}
            onPress={() =>
              setActiveDropdown((prev) =>
                prev === "priority" ? null : "priority"
              )
            }
          >
            <Text>
              {dummyPriorityLevels.find((p) => p.value === priority)?.label ||
                "Select priority..."}
            </Text>
          </TouchableOpacity>
        ),
        dropdown:
          activeDropdown === "priority" &&
          renderDropdown(dummyPriorityLevels, setPriority),
      },
      {
        label: "Due Date",
        renderInput: (
          <TouchableOpacity
            style={styles.selector}
            onPress={() => setDatePickerVisible(true)} // Open the picker on press
          >
            <Text>{dueDate.toLocaleDateString()}</Text>
          </TouchableOpacity>
        ),
        datePicker: isDatePickerVisible && (
          <DateTimePicker
            value={dueDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        ),
      },
      {
        renderInput: (
          <Button mode="contained" onPress={handleCreate} style={styles.button}>
            Create Task
          </Button>
        ),
      },
    ];

    return formFields;
  };

  return (
    <>
      <Text style={styles.pageTitle}>🆕 Create New Task</Text>
      <FlatList
        data={renderForm()}
        renderItem={({ item, index }) => (
          <View
            key={index}
            style={index === 0 ? styles.firstItem : styles.item}
          >
            {item.renderInput}
            {item.dropdown}
            {item.datePicker}
          </View>
        )}
        keyExtractor={(_, index) => String(index)}
        contentContainerStyle={styles.scrollViewContainer}
      />
    </>
  );
}

const styles = StyleSheet.create({
  pageTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    color: '#333',
  },
  scrollViewContainer: {
    flexGrow: 1,
    padding: 20,
  },
  item: {
    marginBottom: 15,
  },
  title: { fontSize: 22, marginBottom: 20, textAlign: "center" },
  input: { marginBottom: 20 },
  label: { fontSize: 16, marginBottom: 5, marginTop: 10 },
  selector: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 4,
  },
  list: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginTop: 5,
    marginBottom: 20,
    maxHeight: 150,
  },
  option: { padding: 10, borderBottomWidth: 1, borderBottomColor: "#eee" },
  button: { marginTop: 20 },
});
