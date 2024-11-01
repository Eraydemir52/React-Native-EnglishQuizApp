import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";

export default function InputWord({ text, textInputConfig, inValid }) {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.textInput}
        placeholder={text}
        placeholderTextColor={inValid ? "red" : "blue"} //buraya bak hatalıysa red değilse blue renkte
        {...textInputConfig}
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

  label: {
    fontSize: 15,
    color: "blue",
    marginBottom: 4,
  },
  inValidLabel: {
    color: "red",
  },
});
