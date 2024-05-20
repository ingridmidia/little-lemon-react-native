import { useState } from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from "react-native";

export default function Onboarding() {
  const [firstName, onChangeFirstName] = useState("");
  const [checkFirstName, setCheckFirstName] = useState(true);
  const [email, onChangeEmail] = useState("");
  const [checkEmail, setCheckEmail] = useState(true);

  const handleCheckFirstName = (firstName) => {
    const regex = /^[A-Za-z]+$/;
    setCheckFirstName(firstName.trim() !== "" && regex.test(firstName));
  };

  const handleFirstNameChange = (firstName) => {
    onChangeFirstName(firstName);
    handleCheckFirstName(firstName);
  };

  const handleCheckEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setCheckEmail(regex.test(email));
  };

  const handleEmailChange = (email) => {
    onChangeEmail(email);
    handleCheckEmail(email);
  };

  return (
    <KeyboardAvoidingView
      style={onboardingStyles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView keyboardDismissMode="on-drag">
        <Text style={onboardingStyles.headerText}>Let us get to know you</Text>
        <Text style={onboardingStyles.regularText}>First Name</Text>
        <TextInput
          value={firstName}
          onChangeText={handleFirstNameChange}
          style={onboardingStyles.input}
          placeholder="First Name"
        />
        {!checkFirstName && (
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
        />
        {!checkEmail && (
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
});
