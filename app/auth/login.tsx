// app/(auth)/login.tsx
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { TextInput, Button } from "react-native-paper";
import { useState } from "react";

export default function LoginScreen() {
  const [userType, setUserType] = useState("Admin"); // Default user type
  const router = useRouter();

  const handleLogin = async () => {
    // Authenticate user...
    // const userRole = "Admin"; // or 'Teacher' or 'Student' based on your auth response
    // const userRole = "Teacher"; // or 'Teacher' or 'Student' based on your auth response
    // const userRole = "Student"; // or 'Teacher' or 'Student' based on your auth response

    if (userType === "Teacher") {
      router.replace("/teacher/dashboard");
    } else if (userType === "Admin") {
      router.replace("/admin/dashboard");
    } else {
      router.replace("/student/dashboard");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        label="User Type"
        value={userType}
        onChangeText={(text) => setUserType(text)}
        style={styles.input}
      />
      <TextInput label="Email" style={styles.input} />
      <TextInput label="Password" secureTextEntry style={styles.input} />
      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        Login
      </Button>
      <TouchableOpacity onPress={() => router.push("/auth/forgot-password")}>
        <Text style={styles.linkText}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/auth/register")}>
        <Text style={styles.linkText}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: "center" },
  input: { marginBottom: 15 },
  button: { marginBottom: 15 },
  linkText: { color: "#6200ee", textAlign: "center", marginTop: 10 },
});
