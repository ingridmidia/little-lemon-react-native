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
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { checkFirstName, checkEmail } from "../utils/validations";

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
    <KeyboardAvoidingView
      style={onboardingStyles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Image
        style={onboardingStyles.logo}
        source={require("../img/logo.png")}
      />
      <ScrollView keyboardDismissMode="on-drag">
        <Text style={onboardingStyles.headerText}>Let us get to know you</Text>
        <Text style={onboardingStyles.regularText}>First Name</Text>
        <TextInput
          value={userInfo.firstName}
          onChangeText={(value) => handleUserInfoChange("firstName")(value)}
          style={onboardingStyles.input}
          placeholder="First Name"
          onBlur={() => setTouchedFirstName(true)}
        />
        {touchedFirstName && !checkFirstName(userInfo.firstName) && (
          <Text style={onboardingStyles.errorText}>
            First name cannot be empty and should contain only letters.
          </Text>
        )}
        <Text style={onboardingStyles.regularText}>Email</Text>
        <TextInput
          value={userInfo.email}
          onChangeText={(value) => handleUserInfoChange("email")(value)}
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
          style={[
            onboardingStyles.button,
            {
              backgroundColor:
                 checkFirstName(userInfo.firstName) && checkEmail(userInfo.email)
                  ? "#6a8f5f"
                  : "#cccccc",
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const onboardingStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFF0",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 25,
  },
  headerText: {
    fontSize: 30,
    padding: 50,
    marginVertical: 8,
    color: "#0e3e30",
    textAlign: "center",
  },
  regularText: {
    fontSize: 24,
    marginVertical: 8,
    color: "#0e3e30",
    textAlign: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    backgroundColor: "white",
  },
  button: {
    fontSize: 20,
    padding: 10,
    marginVertical: 20,
    margin: 100,
    borderRadius: 30,
  },
  buttonText: {
    color: "#0e3e30",
    textAlign: "center",
    fontSize: 30,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    fontSize: 14,
  },
  logo: {
    marginTop: 45,
    height: 100,
    width: 100,
    resizeMode: "contain",
  },
});
