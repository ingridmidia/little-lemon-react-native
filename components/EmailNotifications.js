import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Switch } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function EmailNotifications() {
  const [notifications, setNotifications] = useState({
    orderStatuses: false,
    passwordChanges: false,
    specialOffers: false,
    newsletter: false,
  });

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const storedNotifications = await AsyncStorage.getItem("notifications");
        if (storedNotifications !== null) {
          setNotifications(JSON.parse(storedNotifications));
        }
      } catch (error) {
        console.error("Error loading notifications:", error);
      }
    };

    loadNotifications();
  }, []);

  useEffect(() => {
    const saveNotifications = async () => {
      try {
        await AsyncStorage.setItem("notifications", JSON.stringify(notifications));
      } catch (error) {
        console.error("Error saving notifications:", error);
      }
    };

    saveNotifications();
  }, [notifications]);

  const updateState = (key) => (value) => {
    setNotifications((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Email Notifications</Text>
      <View style={styles.row}>
        <Text style={styles.text}>Order Statuses</Text>
        <Switch
          value={notifications.orderStatuses}
          onValueChange={(value) => updateState("orderStatuses")(value)}
          style={styles.switch}
          color="#6a8f5f"
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>Password Changes</Text>
        <Switch
          value={notifications.passwordChanges}
          onValueChange={(value) => updateState("passwordChanges")(value)}
          style={styles.switch}
          color="#6a8f5f"
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>Special Orders</Text>
        <Switch
          value={notifications.specialOffers}
          onValueChange={(value) => updateState("specialOffers")(value)}
          style={styles.switch}
          color="#6a8f5f"
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>Newsletter</Text>
        <Switch
          value={notifications.newsletter}
          onValueChange={(value) => updateState("newsletter")(value)}
          style={styles.switch}
          color="#6a8f5f"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left",
  },
  text: {
    fontSize: 16,
  },
  switch: {
    transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
    color: "#6a8f5f",
  },
});
