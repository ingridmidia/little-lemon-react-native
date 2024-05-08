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

export default function LoginScreen() {
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  const [loggedIn, setLoginMessage] = useState(false);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView keyboardDismissMode="on-drag">
        <Text style={styles.headerText}>Welcome to Little Lemon</Text>
        {loggedIn && <Text style={styles.headerText}>You are logged in!</Text>}
        {!loggedIn && (
          <>
            <Text style={styles.regularText}>Login to continue </Text>
            <TextInput
              value={email}
              onChangeText={onChangeEmail}
              style={styles.input}
              placeholder="Email"
              keyboardType={"email-address"}
            />
            <TextInput
              value={password}
              onChangeText={onChangePassword}
              style={styles.input}
              placeholder="Password"
              secureTextEntry={true}
            />
            <Pressable
              style={styles.button}
              onPress={() => {
                setLoginMessage(!loggedIn);
              }}
            >
              <Text style={styles.buttonText}>Login</Text>
            </Pressable>
          </>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    padding: 40,
    fontSize: 30,
    color: "#EDEFEE",
    textAlign: "center",
  },
  regularText: {
    fontSize: 24,
    padding: 20,
    marginVertical: 8,
    color: "#EDEFEE",
    textAlign: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    borderColor: "EDEFEE",
    backgroundColor: "white",
  },
  button: {
    fontSize: 22,
    padding: 10,
    marginVertical: 8,
    margin: 40,
    backgroundColor: "#EDEFEE",
    borderColor: "#EDEFEE",
    borderWidth: 2,
    borderRadius: 12,
  },
  buttonText: {
    color: "#333333",
    textAlign: "center",
    fontSize: 32,
  },
});
