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
            AsyncStorage.removeItem("userInfo");
            AsyncStorage.removeItem("notifications");
            navigation.navigate("Onboarding");
          } catch (error) {
            console.error("Error removing user info:", error);
          }
        }}
      >
        <Text style={headerStyles.logout}>Logout</Text>
      </Pressable>
    </View>
  );
}

const headerStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    paddingTop: 15,
    paddingHorizontal: 10,
  },
  logo: {
    height: 70,
    width: 200,
    resizeMode: "contain",
    marginTop: 20,
  },
  logout: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    color: "#0e3e30",
  },
});
