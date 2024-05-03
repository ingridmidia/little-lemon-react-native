import { View, Text } from "react-native";

export default function LittleLemonFooter() {
  return (
    <View
      style={{
        flex: 0.15,
        backgroundColor: "#F4CE14",
        position: "absolute",
        bottom: 0,
        right: 0,
        left: 0,
      }}
    >
      <Text
        style={{
          padding: 15,
          fontSize: 14,
          color: "black",
          textAlign: "center",
        }}
      >
        All rights reserved by Little Lemon, 2024
      </Text>
    </View>
  );
}
