import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";

import WordItem from "./WordItem";
function renderWordItem({ item }) {
  return <WordItem {...item} />;
}

export default function WordList({ kelimeler }) {
  console.log("Kelimeler:", JSON.stringify(kelimeler));

  return (
    <View style={styles.container}>
      <FlatList
        data={kelimeler}
        keyExtractor={(item) => item.id.toString()}
        // Burada `toString()` fonksiyonu doğru şekilde çağrılıyor
        renderItem={renderWordItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
