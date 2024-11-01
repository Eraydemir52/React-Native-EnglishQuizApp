import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { WordsContext } from "../store/wordContext";
import { deleteWordHttp } from "../help/http";
import { AuthContext } from "../store/auth-context";

export default function WordItem({ ingilizcekelime, id, turkcekelime }) {
  const navigation = new useNavigation();
  const wordsContext = useContext(WordsContext);
  const authContext = useContext(AuthContext);
  const userId = authContext.userId;
  console.log("UserID:" + userId);
  function wordPress() {
    navigation.navigate("ManageWord", {
      wordId: id,
    });
  }
  console.log(id);
  async function deleteWord() {
    wordsContext.deleteWord(id);
    await deleteWordHttp(userId, id);
  }

  return (
    <Pressable
      onPress={wordPress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.wordContainer}>
        <View style={styles.wordsList}>
          <Text style={styles.words}>{ingilizcekelime}</Text>
          <Text style={styles.words}>-</Text>
          <Text style={styles.words}>{turkcekelime}</Text>
        </View>
        <View style={styles.iconContainer}>
          <View style={styles.icon}>
            <FontAwesome
              name="pencil"
              size={24}
              color="blue"
              onPress={() => navigation.navigate("ManageWord", { wordId: id })}
            />
          </View>
          <View style={styles.icon}>
            <MaterialIcons
              name="delete"
              size={24}
              color="blue"
              onPress={deleteWord}
            />
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wordContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
    marginHorizontal: 8,
    borderRadius: 24,
    backgroundColor: "white",
    padding: 20,
  },
  wordsList: {
    flexDirection: "row",
  },
  words: {
    color: "blue",
    marginHorizontal: 5,
    fontWeight: "bold",
    fontSize: 16,
  },
  iconContainer: {
    flexDirection: "row",
  },
  icon: {
    marginHorizontal: 10,
  },
  pressed: {
    opacity: 0.5,
  },
});
