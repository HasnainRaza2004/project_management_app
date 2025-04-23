import React, { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Text, Card, Switch, useTheme, Avatar } from "react-native-paper";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
};

const initialUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "johndoe@university.edu",
    role: "Teacher",
    isActive: true,
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "janesmith@student.edu",
    role: "Student",
    isActive: false,
  },
  {
    id: "3",
    name: "Alex Ray",
    email: "alexray@admin.edu",
    role: "Admin",
    isActive: true,
  },
];

export default function AdminUsers() {
  const theme = useTheme();
  const [users, setUsers] = useState<User[]>(initialUsers);

  const handleToggle = (id: string) => {
    const updated = users.map((user) =>
      user.id === id ? { ...user, isActive: !user.isActive } : user
    );
    setUsers(updated);
  };

  const renderItem = ({ item }: { item: User }) => (
    <Card style={styles.card}>
      <Card.Title
        left={(props) => (
          <Avatar.Icon {...props} icon="account" style={styles.avatar} />
        )}
        title={`${item.name} - ${item.role}`}
        subtitle={item.email}
        right={() => (
          <View style={styles.switchContainer}>
            <Text style={styles.statusText}>
              {item.isActive ? "Active" : "Inactive"}
            </Text>
            <Switch
              value={item.isActive}
              onValueChange={() => handleToggle(item.id)}
              color={theme.colors.primary}
            />
          </View>
        )}
      />
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Users</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f4f6f8" },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  card: {
    marginBottom: 15,
    elevation: 2,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  avatar: {
    backgroundColor: "#6200ee",
  },
  switchContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  statusText: {
    fontSize: 10,
  },
});
