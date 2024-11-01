import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import QuizForm from "../components/QuizForm";
import kelimeler from "../data/kelimeler.json";
import { useNavigation } from "@react-navigation/native";
import { calculateScore } from "../help/calculateScore";
import { WordsContext } from "../store/wordContext";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Quiz() {
  const [labelWord, setLabelWord] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigation = useNavigation();
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const wordsContext = useContext(WordsContext);
  const sumQuestions = wordsContext.words.length;
  const score = calculateScore(correctAnswersCount, wordsContext.words.length);
  wordsContext.score = score;
  const wordHandler = () => {
    if (wordsContext.words.length > 0) {
      setLabelWord(wordsContext.words[currentIndex].ingilizcekelime);
    } else {
      Alert.alert("Kelime Yok");
    }
  };
  useEffect(() => {
    wordHandler();
    navigation.setOptions({
      headerRight: () => (
        <Text style={styles.headerTitle}>
          ({currentIndex + 1}/{sumQuestions})
        </Text>
      ),
    });
  }, [currentIndex]);
  const checkAnswerHandler = (answer) => {
    const correctAnswer = wordsContext.words[currentIndex].turkcekelime;
    if (answer.trim().toLowerCase() === correctAnswer.trim().toLowerCase()) {
      Alert.alert("Doğru Cevap");
      setCorrectAnswersCount(correctAnswersCount + 1);
    } else {
      Alert.alert("Yanlış Cevap");
    }
  };

  const nextQuestionHandler = () => {
    if (currentIndex < wordsContext.words.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // setCurrentIndex(0); // Dizinin sonuna geldiğinde başa dön
      Alert.alert("Quiz bitti başarı:" + score);
      navigation.navigate("Home", { score: score });
    }
  };

  function correctAnswerHandler() {
    const correctAnswer = wordsContext.words[currentIndex].turkcekelime;
    Alert.alert("Doğru Cevap: " + correctAnswer);
  }

  console.log("Score: " + score);

  return (
    <QuizForm
      wordlabel={labelWord}
      continueHandler={nextQuestionHandler}
      checkAnswerHandler={checkAnswerHandler}
      correctAnswerHandler={correctAnswerHandler}
    />
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    color: "white",
    fontSize: 20,
  },
});
