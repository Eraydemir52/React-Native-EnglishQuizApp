import { StyleSheet, Text, View } from "react-native";
import React from "react";
import WordList from "./WordList";

export default function Words({ kelimeler }) {
  console.log("Words:" + kelimeler);
  return (
    <View style={styles.container}>
      <WordList kelimeler={kelimeler} />
    </View>
  );
}

const styles = StyleSheet.create({});
