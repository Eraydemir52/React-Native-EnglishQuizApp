import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";

export default function Input({
  label,
  keyboardType,
  onUpdateValue,
  value,
  secure,
  isInValid,
}) {
  console.log("İnput hataları:" + isInValid);
  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, isInValid && styles.labelInvalid]}>
        {label}
      </Text>
      <TextInput
        style={[styles.input]}
        autoCapitalize="none"
        keyboardType={keyboardType}
        onChangeText={onUpdateValue}
        value={value}
        secureTextEntry={secure}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 10,
  },
  label: {
    color: "white",
    marginBottom: 3,
  },
  labelInvalid: {
    color: "red",
  },
  input: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 20,
    fontSize: 16,
  },
});
