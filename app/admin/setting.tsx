// app/(admin)/settings.tsx
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Switch, Divider, IconButton, useTheme } from 'react-native-paper';

export default function AdminSettings() {
  const theme = useTheme();

  // Setting states
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [userRegistration, setUserRegistration] = useState(true);
  const [projectAutoApproval, setProjectAutoApproval] = useState(false);
  const [dataBackup, setDataBackup] = useState(true);

  // Reusable component for each setting item
  const SettingItem = ({
    icon,
    label,
    value,
    onToggle,
  }: {
    icon: string;
    label: string;
    value: boolean;
    onToggle: () => void;
  }) => (
    <View style={styles.settingItem}>
      <View style={styles.settingLabel}>
        <IconButton icon={icon} size={24} iconColor={theme.colors.primary} />
        <Text style={styles.settingText}>{label}</Text>
      </View>
      <Switch value={value} onValueChange={onToggle} color={theme.colors.primary} />
    </View>
  );
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>System Settings</Text>
      
      <SettingItem
        icon="tools"
        label="Enable Maintenance Mode"
        value={maintenanceMode}
        onToggle={() => setMaintenanceMode(!maintenanceMode)}
      />
      <Divider />

      <SettingItem
        icon="email-outline"
        label="Enable Email Notifications"
        value={emailNotifications}
        onToggle={() => setEmailNotifications(!emailNotifications)}
      />
      <Divider />

      <SettingItem
        icon="account-plus-outline"
        label="Allow User Registration"
        value={userRegistration}
        onToggle={() => setUserRegistration(!userRegistration)}
      />
      <Divider />

      <SettingItem
        icon="check-decagram"
        label="Enable Project Auto-Approval"
        value={projectAutoApproval}
        onToggle={() => setProjectAutoApproval(!projectAutoApproval)}
      />
      <Divider />

      <SettingItem
        icon="backup-restore"
        label="Enable Data Backup"
        value={dataBackup}
        onToggle={() => setDataBackup(!dataBackup)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f8',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  settingLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontSize:  12,
    marginLeft: 5,
  },
});
