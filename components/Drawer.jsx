// components/DynamicDrawer.tsx
import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Drawer, Text, useTheme, IconButton } from "react-native-paper";
import { useRouter } from "expo-router";

export default function DynamicDrawer({ userType, menus }) {
  const { width: screenWidth } = Dimensions.get("window");
  const theme = useTheme();
  const router = useRouter();
  const [active, setActive] = React.useState("");
  const [collapsed, setCollapsed] = React.useState(true);

  const drawerWidth = collapsed ? 80 : 240;

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <View style={[styles.drawerContainer, { width: drawerWidth }]}>
      {/* Header */}
      <View style={styles.drawerHeader}>
        {collapsed ? (
          <IconButton icon="chevron-right" size={20} onPress={toggleCollapse} />
        ) : (
          <View style={styles.headerExpanded}>
            <Text style={styles.headerText}>{userType} Menu</Text>
            <IconButton
              icon="chevron-left"
              size={20}
              onPress={toggleCollapse}
            />
          </View>
        )}
      </View>

      {/* Drawer Items */}
      <Drawer.Section style={styles.drawerSection}>
        {menus.map((menu) =>
          collapsed ? (
            <Drawer.CollapsedItem
              key={menu.route}
              focusedIcon={menu.icon}
              unfocusedIcon={`${menu.icon}`}
              onPress={() => {
                setActive(menu.route);
                router.push(menu.route);
              }}
              style={[active === menu.route && styles.activeItem]}
              focused={active === menu.route}
            />
          ) : (
            <Drawer.Item
              key={menu.route}
              label={menu.label}
              icon={menu.icon}
              active={active === menu.route}
              onPress={() => {
                setActive(menu.route);
                router.push(menu.route);
              }}
            />
          )
        )}
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    backgroundColor: "#fff",
    borderRightWidth: 1,
    borderColor: "#ddd",
    height: "100%",
  },
  drawerHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  headerExpanded: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 8,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  drawerSection: {
    marginTop: 8,
  },
  activeItem: {
    backgroundColor: "#e0f7fa",
    borderRadius: 50,
  },
});
