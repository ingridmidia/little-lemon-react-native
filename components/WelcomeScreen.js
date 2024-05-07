import * as React from "react";
import { Text, ScrollView, StyleSheet } from "react-native";

export default function WelcomeScreen() {
  return (
    <ScrollView indicatorStyle={"white"} style={welcomeStyle.container}>
      <Text style={welcomeStyle.titleText}>Welcome to Little Lemon</Text>
      <Text style={welcomeStyle.text}>
        Little Lemon is a charming neighborhood bistro that serves simple food
        and classic cocktails in a lively but casual environment. We would love
        to hear more about your experience with us!
      </Text>
    </ScrollView>
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
});
