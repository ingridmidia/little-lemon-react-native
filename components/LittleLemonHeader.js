import { View, Text, StyleSheet, Image } from "react-native";

export default function LittleLemonHeader() {
  return (
    <View style={headerStyles.container}>
      <Image style={headerStyles.logo} source={require("../img/littleLemonLogo.png")} />
      <Text style={headerStyles.headerText}>
        Your Local Mediterranean Bistro
      </Text>
    </View>
  );
}

const headerStyles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    
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
    marginTop: 20
  },
});
