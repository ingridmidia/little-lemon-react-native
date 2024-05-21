import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import EmailNotifications from "./EmailNotifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  checkFirstName,
  checkLastName,
  checkEmail,
  checkPhone,
} from "../utils/validations";

export default function Profile() {
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [touchedFirstName, setTouchedFirstName] = useState(false);
  const [touchedLastName, setTouchedLastName] = useState(false);
  const [touchedEmail, setTouchedEmail] = useState(false);
  const [touchedPhone, setTouchedPhone] = useState(false);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const userInfo = await AsyncStorage.getItem("userInfo");
        if (userInfo !== null) {
          setUserInfo(JSON.parse(userInfo));
        }
      } catch (error) {
        console.error("Error loading notifications:", error);
      }
    };

    getUserInfo();
  }, []);

  const handleUserInfoChange = (key) => (value) => {
    setUserInfo((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const saveUserInfo = async () => {
    try {
      await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
      Alert.alert("Success", "User information saved successfully.");
    } catch (error) {
      console.error("Error saving user info:", error);
    }
  };

  return (
    <View style={profileStyles.container}>
      <Text style={profileStyles.header}> Profile</Text>
      <Text style={profileStyles.text}> First Name</Text>
      <TextInput
        style={profileStyles.input}
        value={userInfo.firstName}
        onChangeText={(value) => handleUserInfoChange("firstName")(value)}
        onBlur={() => setTouchedFirstName(true)}
      />
      {touchedFirstName && !checkFirstName(userInfo.firstName) && (
        <Text style={profileStyles.errorText}>
          First name cannot be empty and should contain only letters.
        </Text>
      )}
      <Text style={profileStyles.text}> Last Name</Text>
      <TextInput
        style={profileStyles.input}
        placeholder="Last Name"
        value={userInfo.lastName}
        onChangeText={(value) => handleUserInfoChange("lastName")(value)}
        onBlur={() => setTouchedLastName(true)}
      />
      {touchedLastName && !checkLastName(userInfo.lastName) && (
        <Text style={profileStyles.errorText}>
          Last name cannot be empty and should contain only letters.
        </Text>
      )}
      <Text style={profileStyles.text}> Email</Text>
      <TextInput
        style={profileStyles.input}
        value={userInfo.email}
        onChangeText={(value) => handleUserInfoChange("email")(value)}
        onBlur={() => setTouchedEmail(true)}
      />
      {touchedEmail && !checkEmail(userInfo.email) && (
        <Text style={profileStyles.errorText}>Please enter a valid email.</Text>
      )}
      <Text style={profileStyles.text}> Phone Number</Text>
      <TextInput
        style={profileStyles.input}
        value={userInfo.phone}
        placeholder="Phone Number"
        onChangeText={(value) => handleUserInfoChange("phone")(value)}
        onBlur={() => setTouchedPhone(true)}
      />
      {touchedPhone && !checkPhone(userInfo.phone) && (
        <Text style={profileStyles.errorText}>
          Please enter a valid phone number.
        </Text>
      )}
      <Pressable
        style={[
          profileStyles.button,
          {
            backgroundColor:
              checkFirstName(userInfo.firstName) &&
              checkLastName(userInfo.lastName) &&
              checkEmail(userInfo.email) &&
              checkPhone(userInfo.phone)
                ? "#6a8f5f"
                : "#cccccc",
          },
        ]}
        disabled={
          !checkFirstName(userInfo.firstName) ||
          !checkLastName(userInfo.lastName) ||
          !checkEmail(userInfo.email) ||
          !checkPhone(userInfo.phone)
        }
        onPress={() => {
          saveUserInfo();
        }}
      >
        <Text style={profileStyles.buttonText}>Save Changes</Text>
      </Pressable>
      <EmailNotifications />
    </View>
  );
}

const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  input: {
    height: 40,
    marginHorizontal: 12,
    marginTop: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    backgroundColor: "white",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  header: {
    margin: 10,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    marginHorizontal: 12,
  },
  button: {
    fontSize: 20,
    padding: 10,
    marginVertical: 10,
    margin: 100,
    borderRadius: 30,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    fontSize: 14,
    marginHorizontal: 12,
  },
});
