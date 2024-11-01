import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect, useContext, useLayoutEffect } from "react";
import WordForm from "../components/WordForm";
import kelimeler from "../data/kelimeler.json";
import { WordsContext } from "../store/wordContext";
import { storeWord, updateWord } from "../help/http";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorText from "../components/ErrorText";
import { AuthContext } from "../store/auth-context";

export default function ManageWord({ route, navigation }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();
  // route.params'tan gelen isEditing değerini alıyoruz

  const wordsContext = useContext(WordsContext);
  const authContext = useContext(AuthContext);
  const userId = authContext.userId;

  let isEditing = false;
  const wordId = route.params?.wordId;

  const selectedWord = wordsContext.words.find((c) => c.id == wordId);

  if (wordId) {
    isEditing = true;
  }
  console.log(isEditing);

  function cancelHandler() {
    navigation.goBack();
  }

  async function addorUpdateHandler(wordData) {
    setIsSubmitting(true);
    try {
      if (isEditing) {
        await updateWord(userId, wordId, wordData);
        wordsContext.updateWord(wordId, wordData);
      } else {
        const id = await storeWord(userId, wordData);

        wordsContext.addWord({ ...wordData, id });
      }

      navigation.goBack();
    } catch (error) {
      setError("Kursları eklemede veya güncellemede problem var !");
      console.log(error);
    }
  }

  if (isSubmitting) {
    return <LoadingSpinner />;
  }

  return (
    <View>
      <WordForm
        buttonLabel={isEditing ? "Kelimeyi Güncelle" : "Kelime Ekle"}
        onSubmit={addorUpdateHandler}
        cancelHandler={cancelHandler}
        defaultValues={selectedWord}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
