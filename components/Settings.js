import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import { Switch } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Settings() {
  const [preferences, setPreferences] = useState({
    pushNotifications: false,
    emailMarketing: false,
    latestNews: false,
  });

  useEffect(() => {
    const loadPreferences = async () => {
      try {
        const storedPreferences = await AsyncStorage.getItem("preferences");
        if (storedPreferences !== null) {
          setPreferences(JSON.parse(storedPreferences));
        }
      } catch (error) {
        console.error("Error loading preferences:", error);
      }
    };

    loadPreferences();
  }, []);

  useEffect(() => {
    const savePreferences = async () => {
      try {
        await AsyncStorage.setItem("preferences", JSON.stringify(preferences));
      } catch (error) {
        console.error("Error saving preferences:", error);
      }
    };

    savePreferences();
  }, [preferences]);

  const updateState = (key) => (value) => {
    setPreferences((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Account Preferences</Text>
      <View style={styles.row}>
        <Text>Push notifications</Text>
        <Switch
          value={preferences.pushNotifications}
          onValueChange={(value) => updateState("pushNotifications")(value)}
        />
      </View>
      <View style={styles.row}>
        <Text>Marketing emails</Text>
        <Switch
          value={preferences.emailMarketing}
          onValueChange={(value) => updateState("emailMarketing")(value)}
        />
      </View>
      <View style={styles.row}>
        <Text>Latest news</Text>
        <Switch
          value={preferences.latestNews}
          onValueChange={(value) => updateState("latestNews")(value)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    padding: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  header: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
