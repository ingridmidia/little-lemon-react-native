import React, { useState } from "react";
import {
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  useColorScheme,
  Pressable
} from "react-native";

export default function WelcomeScreen({navigation}) {
  const [firstName, onChangeFirstName] = useState("");
  const colorScheme = useColorScheme();

  return (
    <KeyboardAvoidingView
      style={welcomeStyle.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        indicatorStyle={"white"}
        keyboardDismissMode="on-drag"
        style={
          colorScheme === "light"
            ? { backgroundColor: "#FFFFF0" }
            : { backgroundColor: "#333333" }
        }
      >
        <Text style={welcomeStyle.titleText}>Welcome to Little Lemon</Text>
        <Text style={welcomeStyle.text}>
          Little Lemon is a charming neighborhood bistro that serves simple food
          and classic cocktails in a lively but casual environment. We would
          love to hear more about your experience with us!
        </Text>
        {/* <TextInput
          value={firstName}
          onChangeText={onChangeFirstName}
          style={welcomeStyle.input}
          placeholder="First Name"
        /> */}
        <Pressable style={welcomeStyle.button} onPress={() => navigation.navigate("Menu")}>
          <Text style={welcomeStyle.buttonText}>View Menu</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const welcomeStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleText: {
    padding: 25,
    fontSize: 30,
    color: "#0e3e30",
    textAlign: "center",
  },
  text: {
    fontSize: 24,
    color: "#0e3e30",
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
  button: {
    fontSize: 22,
    padding: 8,
    marginVertical: 8,
    margin: 40,
    backgroundColor: "#6a8f5f",
    borderRadius: 30,
  },
  buttonText: {
    color: "#0e3e30",
    textAlign: "center",
    fontSize: 30,
  },
});
