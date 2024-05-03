import * as React from "react";
import { View, Text } from "react-native";

export default function LittleLemonHeader() {
  return (
    <View
      style={{
        flex: 0,
        backgroundColor: "#F4CE14",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          padding: 30,
          fontSize: 30,
          color: "black",
          textAlign: "center",
        }}
      >
        Little Lemon
      </Text>
    </View>
  );
}
