import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";

export default function Input({ text, value, onChangeText, textInputConfig }) {
  const [answer, setAnswer] = useState("");
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.textInput}
        placeholder={text}
        placeholderTextColor="blue"
        {...textInputConfig}
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 8,
    marginVertical: 10,
  },
  textInput: {
    color: "blue",
    borderColor: "blue",
    borderWidth: 2,
    width: "100%",
    padding: 20,
    borderRadius: 20,
  },
});
