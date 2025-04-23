// components/CustomBackButton.tsx
import React from "react";
import { IconButton } from "react-native-paper";
import { useRouter } from "expo-router";

export default function CustomBackButton() {
  const router = useRouter();
  return (
    <IconButton
      icon="arrow-left"
      size={24}
      onPress={() => router.back()}
    />
  );
}
