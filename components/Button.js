import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

export default function Button({ textButton, onPress }) {
  return (
    <View>
      <Pressable
        style={({ pressed }) => [
          styles.textButton,
          pressed && styles.pressed, // Basılıyken opacity'yi 0.5 yapar
        ]}
        onPress={onPress}
      >
        <Text style={styles.button}>{textButton}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  textButton: {
    backgroundColor: "blue",
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "blue",
    borderRadius: 20,
  },
  button: {
    fontWeight: "bold",
    color: "white",
    fontSize: 16,
  },
  pressed: {
    opacity: 0.5,
  },
});
