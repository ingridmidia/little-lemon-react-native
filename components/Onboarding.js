import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Image
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Onboarding({ navigation }) {
  const [firstName, onChangeFirstName] = useState("");
  const [isFirstNameTouched, setIsFirstNameTouched] = useState(false);
  const [checkFirstName, setCheckFirstName] = useState(false);
  const [email, onChangeEmail] = useState("");
  const [isEmailTouched, setIsEmailTouched] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleCheckFirstName = (firstName) => {
    const regex = /^[A-Za-z]+$/;
    setCheckFirstName(firstName.trim() !== "" && regex.test(firstName));
  };

  const handleFirstNameChange = (firstName) => {
    onChangeFirstName(firstName);
    setIsFirstNameTouched(true);
    handleCheckFirstName(firstName);
  };

  const handleCheckEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setCheckEmail(regex.test(email));
  };

  const handleEmailChange = (email) => {
    onChangeEmail(email);
    setIsEmailTouched(true);
    handleCheckEmail(email);
  };

  useEffect(() => {
    const getLoggedInStatus = async () => {
      try {
        const value = await AsyncStorage.getItem("loggedIn");
        if (value === null || value === false) {
          navigation.navigate("Onboarding");
        }
        if (value !== null) {
          setLoggedIn(JSON.parse(value));
        }
        console.log("getting logged in as " + value);
      } catch (error) {
        console.error("Error fetching loggedIn status:", error);
      }
    };

    getLoggedInStatus();
  }, []);

  useEffect(() => {
    const saveLoggedInStatus = async () => {
      try {
        await AsyncStorage.setItem("loggedIn", JSON.stringify(loggedIn));
        console.log("logged in set to " + loggedIn);
      } catch (error) {
        console.error("Error saving loggedIn status:", error);
      }
    };

    saveLoggedInStatus();
  }, [loggedIn]);

  return (
    <KeyboardAvoidingView
      style={onboardingStyles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Image style={onboardingStyles.logo} source={require("../img/logo.png")} />
      <ScrollView keyboardDismissMode="on-drag">
        <Text style={onboardingStyles.headerText}>Let us get to know you</Text>
        <Text style={onboardingStyles.regularText}>First Name</Text>
        <TextInput
          value={firstName}
          onChangeText={handleFirstNameChange}
          style={onboardingStyles.input}
          placeholder="First Name"
          onBlur={() => setIsFirstNameTouched(true)}
        />
        {isFirstNameTouched && !checkFirstName && (
          <Text style={onboardingStyles.errorText}>
            First name cannot be empty and should contain only letters.
          </Text>
        )}
        <Text style={onboardingStyles.regularText}>Email</Text>
        <TextInput
          value={email}
          onChangeText={handleEmailChange}
          style={onboardingStyles.input}
          placeholder="Email"
          keyboardType="email-address"
          onBlur={() => setIsEmailTouched(true)}
        />
        {isEmailTouched && !checkEmail && (
          <Text style={onboardingStyles.errorText}>
            Please enter a valid email.
          </Text>
        )}
        <Pressable
          style={[
            onboardingStyles.button,
            {
              backgroundColor:
                checkEmail && checkFirstName ? "#6a8f5f" : "#cccccc",
            },
          ]}
          disabled={!checkEmail || !checkFirstName}
          onPress={() => {
            setLoggedIn(true);
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
