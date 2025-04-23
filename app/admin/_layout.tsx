// app/(admin)/_layout.tsx
import { Stack, useSegments } from "expo-router";

export default function AdminLayout() {
  const segments = useSegments(); // e.g., ["admin", "dashboard"]
  const currentRoute = segments[segments.length - 1] || "Dashboard";

  const capitalizedTitle =
    currentRoute.charAt(0).toUpperCase() + currentRoute.slice(1);

  return (
    <Stack
      screenOptions={{
        headerTitle: capitalizedTitle,
      }}
    />
  );
}
