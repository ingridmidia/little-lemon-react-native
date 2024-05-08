import React, { useState, } from "react";
import { Text, ScrollView, StyleSheet, TextInput, KeyboardAvoidingView, Platform } from "react-native";

export default function WelcomeScreen() {
  const [firstName, onChangeFirstName] = useState("");

  return (
    <KeyboardAvoidingView
      style={welcomeStyle.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        indicatorStyle={"white"}
        keyboardDismissMode="on-drag"
      >
        <Text style={welcomeStyle.titleText}>Welcome to Little Lemon</Text>
        <Text style={welcomeStyle.text}>
          Little Lemon is a charming neighborhood bistro that serves simple food
          and classic cocktails in a lively but casual environment. We would
          love to hear more about your experience with us!
        </Text>
        <TextInput
          value={firstName}
          onChangeText={onChangeFirstName}
          style={welcomeStyle.input}
          placeholder="First Name"
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const welcomeStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleText: {
    padding: 40,
    fontSize: 30,
    color: "white",
    textAlign: "center",
  },
  text: {
    fontSize: 24,
    color: "white",
    textAlign: "center",
    padding: 20,
    marginVertical: 8,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    borderColor: "EDEFEE",
    backgroundColor: "white",
  },
});
