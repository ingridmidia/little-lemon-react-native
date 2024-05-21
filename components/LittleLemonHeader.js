import { View, StyleSheet, Image, Text, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LittleLemonHeader({ navigation }) {
  return (
    <View style={headerStyles.container}>
      <Image
        style={headerStyles.logo}
        source={require("../img/littleLemonLogo.png")}
        accessible={true}
        accessibilityLabel={"Little Lemon Logo"}
      />
      <Pressable
        onPress={() => {
          try {
            AsyncStorage.setItem("loggedIn", JSON.stringify(false));
            console.log("logged out");
            navigation.navigate("Onboarding");
          } catch (error) {
            console.error("Error saving loggedIn status:", error);
          }
        }}
      >
        <Text>Logout</Text>
      </Pressable>
    </View>
  );
}

const headerStyles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFF0",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 25,
  },
  headerText: {
    padding: 10,
    fontSize: 18,
    color: "black",
    textAlign: "center",
  },
  logo: {
    height: 100,
    width: 300,
    resizeMode: "contain",
    marginTop: 20,
  },
});
