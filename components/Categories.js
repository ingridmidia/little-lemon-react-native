import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";

export default function Categories({ onChange, selections, sections }) {
  return (
    <View style={categoriesStyles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {sections.map((section, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              onChange(section);
            }}
            style={[
              categoriesStyles.button,
              {
                backgroundColor:
                  selections.indexOf(section) !== -1 ? "#FBE362" : "white",
              },
            ]}
          >
            <Text style={categoriesStyles.text}>{section}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const categoriesStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white"
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "#495E57",
    margin: 6,
    borderRadius: 30
  },
  text: {
    fontSize:16,
    color: "black",
    fontWeight: "bold"
  }
});
