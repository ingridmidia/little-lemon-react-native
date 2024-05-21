import * as React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import EmailNotifications from "./EmailNotifications";

export default function Profile() {
  return (
    <View style={profileStyles.container}>
      <Text style={profileStyles.header}> Account</Text>
      <Text style={profileStyles.text}> First Name</Text>
      <TextInput style={profileStyles.input} placeholder="First Name" />
      <Text style={profileStyles.text}> Last Name</Text>
      <TextInput style={profileStyles.input} placeholder="Last Name" />
      <Text style={profileStyles.text}> Email</Text>
      <TextInput style={profileStyles.input} placeholder="Email" />
      <Text style={profileStyles.text}> Phone Number</Text>
      <TextInput style={profileStyles.input} placeholder="Phone Number" />
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
    margin: 16,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    marginHorizontal: 12,
  },
});
