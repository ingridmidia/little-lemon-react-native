import * as React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function LittleLemonFooter() {
  return (
    <View style={footerStyles.container}>
      <Text style={footerStyles.footerText}>
        All rights reserved by Little Lemon, 2024
      </Text>
    </View>
  );
}

const footerStyles = StyleSheet.create({
  container: {
    backgroundColor: "#F4CE14",
    marginBottom: 0,
  },
  footerText: {
    fontSize: 18,
    color: "black",
    textAlign: "center",
    fontStyle: "italic",
    padding:5
  },
});
