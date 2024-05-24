import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, TextInput, Pressable, Image } from "react-native";
import EmailNotifications from "./EmailNotifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  checkFirstName,
  checkLastName,
  checkEmail,
  checkPhone,
  formatPhone,
} from "../utils/validations";
import { Snackbar } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";

export default function Profile() {
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    image: "",
  });

  const [touchedFirstName, setTouchedFirstName] = useState(false);
  const [touchedLastName, setTouchedLastName] = useState(false);
  const [touchedEmail, setTouchedEmail] = useState(false);
  const [touchedPhone, setTouchedPhone] = useState(false);

  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [highlight, setHighlight] = useState(false);
  const [isSaved, setIsSaved] = useState(true);

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);

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

  useEffect(() => {
    if (unsavedChanges) {
      setIsSaved(false);
    }
  }, [unsavedChanges]);

  const handleUserInfoChange = (key) => (value) => {
    setUnsavedChanges(true);
    setIsSaved(false);

    if (key === "phone") {
      value = formatPhone(value);
    }

    setUserInfo((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const saveUserInfo = async () => {
    try {
      await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
      setSnackbarVisible(true);
      setHighlight(true);
      setUnsavedChanges(false);
      setIsSaved(true);
      if (firstNameRef.current) firstNameRef.current.blur();
      if (lastNameRef.current) lastNameRef.current.blur();
      if (emailRef.current) emailRef.current.blur();
      if (phoneRef.current) phoneRef.current.blur();
      setTimeout(() => setHighlight(false), 2000);
    } catch (error) {
      console.error("Error saving user info:", error);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setUserInfo((prevState) => ({
        ...prevState,
        ["image"]: result.assets[0].uri,
      }));
    }
  };

  const removeImage = () => {
    setUserInfo((prevState) => ({
      ...prevState,
      ["image"]: "",
    }));
  };

  return (
    <View style={profileStyles.container}>
      <Text style={profileStyles.header}> Profile</Text>

      <View style={profileStyles.imageContainer}>
        {userInfo.image ? (
          <Image source={{ uri: userInfo.image }} style={profileStyles.image} />
        ) : (
          <View style={profileStyles.imagePlaceholder}>
            <Text style={profileStyles.imagePlaceholderText}>
              {userInfo.firstName && Array.from(userInfo.firstName)[0]}
              {userInfo.lastName && Array.from(userInfo.lastName)[0]}
            </Text>
          </View>
        )}

        <View style={profileStyles.imageButton}>
          <Pressable
            style={[profileStyles.button, { backgroundColor: "#6a8f5f" }]}
            onPress={pickImage}
          >
            <Text style={profileStyles.buttonText}>Change Picture</Text>
          </Pressable>
        </View>
        <View>
          <Pressable
            style={[profileStyles.button, { backgroundColor: "#6a8f5f" }]}
            onPress={removeImage}
          >
            <Text style={profileStyles.buttonText}>Remove Picture</Text>
          </Pressable>
        </View>
      </View>

      <Text style={profileStyles.text}> First Name</Text>
      <TextInput
        ref={firstNameRef}
        style={[profileStyles.input, highlight && profileStyles.highlight]}
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
        ref={lastNameRef}
        style={[profileStyles.input, highlight && profileStyles.highlight]}
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
        ref={emailRef}
        style={[profileStyles.input, highlight && profileStyles.highlight]}
        value={userInfo.email}
        onChangeText={(value) => handleUserInfoChange("email")(value)}
        onBlur={() => setTouchedEmail(true)}
      />
      {touchedEmail && !checkEmail(userInfo.email) && (
        <Text style={profileStyles.errorText}>Please enter a valid email.</Text>
      )}
      <Text style={profileStyles.text}> Phone Number</Text>
      <TextInput
        ref={phoneRef}
        style={[profileStyles.input, highlight && profileStyles.highlight]}
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
              checkPhone(userInfo.phone) &&
              !isSaved
                ? "#6a8f5f"
                : "#cccccc",
          },
        ]}
        disabled={
          !checkFirstName(userInfo.firstName) ||
          !checkLastName(userInfo.lastName) ||
          !checkEmail(userInfo.email) ||
          !checkPhone(userInfo.phone) ||
          isSaved
        }
        onPress={saveUserInfo}
      >
        <Text style={profileStyles.buttonText}>Save Changes</Text>
      </Pressable>
      <EmailNotifications />
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={2000}
      >
        User information saved successfully.
      </Snackbar>
    </View>
  );
}

const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  input: {
    height: 35,
    marginHorizontal: 12,
    marginTop: 5,
    marginBottom: 7,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    backgroundColor: "white",
  },
  highlight: {
    borderColor: "#6a8f5f",
    borderWidth: 2,
  },
  header: {
    margin: 10,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left",
  },
  text: {
    fontSize: 16,
    marginHorizontal: 12,
  },
  button: {
    fontSize: 20,
    padding: 8,
    marginVertical: 8,
    margin: 12,
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
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 4,
    justifyContent: "space-around",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    paddingRight: 10,
  },
  imagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: "#FBE362",
    alignItems: "center",
    justifyContent: "center",
  },
  imagePlaceholderText: {
    fontSize: 32,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  imageButton: {
    paddingLeft: 10,
  },
});
