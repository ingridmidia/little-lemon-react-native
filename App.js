// Stack Navigation
// import { View, StyleSheet } from "react-native";
// import LittleLemonHeader from "./components/LittleLemonHeader";
// import LittleLemonFooter from "./components/LittleLemonFooter";
// import WelcomeScreen from "./components/WelcomeScreen";
// import Menu from "./components/Menu";
// import LoginScreen from "./components/LoginScreen";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";

// const Stack = createNativeStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <View style={styles.container}>
//         <LittleLemonHeader />
//         <Stack.Navigator
//           screenOptions={{ headerStyle: { backgroundColor: "#F4CE14" } }}
//         >
//           <Stack.Screen name="Home" component={WelcomeScreen} />
//           <Stack.Screen name="Menu" component={Menu} />
//           <Stack.Screen name="Login" component={LoginScreen} />
//         </Stack.Navigator>
//       </View>
//       <View style={styles.footer}>
//         <LittleLemonFooter />
//       </View>
//     </NavigationContainer>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#495E57",
//   },
//   footer: {
//     backgroundColor: "#495E57",
//   },
// });

//Tab Navigation
import { View, StyleSheet } from "react-native";
import LittleLemonHeader from "./components/LittleLemonHeader";
import WelcomeScreen from "./components/WelcomeScreen";
import Menu from "./components/Menu";
import LoginScreen from "./components/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import { Iconicons} from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <LittleLemonHeader />
        <Tab.Navigator>
          <Tab.Screen name="Home" component={WelcomeScreen} />
          <Tab.Screen name="Menu" component={Menu} />
          <Tab.Screen name="Login" component={LoginScreen} />
        </Tab.Navigator>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#495E57",
  },
  footer: {
    backgroundColor: "#495E57",
  },
});
