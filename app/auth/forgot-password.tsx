// app/(auth)/forgot-password.tsx
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { TextInput, Button } from "react-native-paper";
import { useState } from "react";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleResetPassword = () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // Handle the password reset logic here (e.g., API call to update password)
    alert("Password reset successful!");
    router.push("/auth/login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      <Text style={styles.instructions}>
        Enter your email and choose a new password.
      </Text>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />
      <TextInput
        label="New Password"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button
        mode="contained"
        onPress={handleResetPassword}
        style={styles.button}
      >
        Reset Password
      </Button>
      <TouchableOpacity onPress={() => router.push("/auth/login")}>
        <Text style={styles.linkText}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, marginBottom: 10, textAlign: "center" },
  instructions: { textAlign: "center", marginBottom: 20 },
  input: { marginBottom: 15 },
  button: { marginBottom: 15 },
  linkText: { color: "#6200ee", textAlign: "center", marginTop: 10 },
});
