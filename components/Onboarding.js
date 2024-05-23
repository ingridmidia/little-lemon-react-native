import React, { useState } from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Image,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { checkFirstName, checkEmail } from "../utils/validations";
import Hero from "./Hero";

export default function Onboarding({ navigation }) {
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [touchedFirstName, setTouchedFirstName] = useState(false);
  const [touchedEmail, setTouchedEmail] = useState(false);

  const handleUserInfoChange = (key) => (value) => {
    setUserInfo((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const saveUserInfo = async () => {
    try {
      await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
    } catch (error) {
      console.error("Error saving user info:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      setUserInfo({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
      });
      setTouchedFirstName(false);
      setTouchedEmail(false);
    }, [])
  );

  return (
    <View style={onboardingStyles.outerContainer}>
      <ScrollView contentContainerStyle={onboardingStyles.container}>
        <View style={onboardingStyles.imageContainer}>
          <Image
            style={onboardingStyles.logo}
            source={require("../img/littleLemonLogo.png")}
            accessible={true}
            accessibilityLabel={"Little Lemon Logo"}
          />
        </View>

        <Hero />

        <KeyboardAvoidingView
          style={onboardingStyles.form}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <Text style={onboardingStyles.regularText}>Name*</Text>
          <TextInput
            value={userInfo.firstName}
            onChangeText={handleUserInfoChange("firstName")}
            style={onboardingStyles.input}
            placeholder="Name"
            onBlur={() => setTouchedFirstName(true)}
          />
          {touchedFirstName && !checkFirstName(userInfo.firstName) && (
            <Text style={onboardingStyles.errorText}>
              First name cannot be empty and should contain only letters.
            </Text>
          )}
          <Text style={onboardingStyles.regularText}>Email*</Text>
          <TextInput
            value={userInfo.email}
            onChangeText={handleUserInfoChange("email")}
            style={onboardingStyles.input}
            placeholder="Email"
            keyboardType="email-address"
            onBlur={() => setTouchedEmail(true)}
          />
          {touchedEmail && !checkEmail(userInfo.email) && (
            <Text style={onboardingStyles.errorText}>
              Please enter a valid email.
            </Text>
          )}
          <Pressable
            style={({ pressed }) => [
              onboardingStyles.button,
              {
                backgroundColor:
                  checkFirstName(userInfo.firstName) &&
                  checkEmail(userInfo.email)
                    ? "#6a8f5f"
                    : "#cccccc",
                opacity: pressed ? 0.8 : 1,
              },
            ]}
            disabled={
              !checkFirstName(userInfo.firstName) || !checkEmail(userInfo.email)
            }
            onPress={() => {
              saveUserInfo();
              navigation.navigate("Main");
            }}
          >
            <Text style={onboardingStyles.buttonText}>Next</Text>
          </Pressable>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}

const onboardingStyles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    justifyContent: "center",
    backgroundColor: "white",
  },
  imageContainer: {
    alignItems: "center",
  },
  form: {
    backgroundColor: "white",
    justifyContent: "center",
    padding: 20,
  },
  regularText: {
    fontSize: 20,
    marginVertical: 2,
    color: "#0e3e30",
  },
  input: {
    width: "100%",
    height: 40,
    marginVertical: 8,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: "white",
  },
  button: {
    width: "100%",
    paddingVertical: 12,
    marginTop: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    fontSize: 14,
  },
  logo: {
    height: 70,
    width: 200,
    resizeMode: "contain",
    marginTop: 45,
  },
});
