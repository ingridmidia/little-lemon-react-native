import { Text, View, Image, StyleSheet } from "react-native";

export default function Hero() {
  return (
    <View style={heroStyles.heroContainer}>
      <View style={heroStyles.mainTitle}>
        <Text style={heroStyles.mainTitleText}>Little Lemon</Text>
        <Text style={heroStyles.mainTitleSubText}>Chicago</Text>
      </View>
      <View style={heroStyles.hero}>
        <Text style={heroStyles.heroText}>
          We are a family owned Mediterranean restaurant, focused on traditional
          recipes served with a modern twist.
        </Text>
        <Image
          style={heroStyles.image}
          source={require("../img/home-image.png")}
        />
      </View>
    </View>
  );
}

const heroStyles = StyleSheet.create({
  heroContainer: {
    backgroundColor: "#495E57",
  },
  mainTitle: {
    padding: 10,
  },
  mainTitleText: {
    color: "#FAFA33",
    fontWeight: "bold",
    fontSize: 36,
  },
  mainTitleSubText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 30,
  },
  hero: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
  },
  heroText: {
    flex: 1,
    fontSize: 20,
    color: "white",
  },
  image: {
    height: 130,
    width: 130,
    resizeMode: "contain",
    borderRadius: 20,
  },
});
