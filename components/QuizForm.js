import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Button from "./Button";
import Input from "./Input";

export default function QuizForm({
  wordlabel,
  continueHandler,
  checkAnswerHandler,
  correctAnswerHandler,

  //sonraki soruya geçerken inputun value değerini sıfırlaması için
}) {
  const [answer, setAnswer] = useState("");
  useEffect(() => {
    setAnswer(""); // Her yeni soru geldiğinde input'u sıfırlıyoruz
  }, [wordlabel]);
  console.log(wordlabel);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{wordlabel}</Text>
      <Input text="Cavap Yazınız" value={answer} onChangeText={setAnswer} />
      <Button textButton="Cevapla" onPress={() => checkAnswerHandler(answer)} />
      <Button textButton="Soruyu Geç" onPress={continueHandler} />
      <Pressable
        style={({ pressed }) => [
          styles.textButton,
          pressed && styles.pressed, // Basılıyken opacity'yi 0.5 yapar
        ]}
        onPress={correctAnswerHandler}
      >
        <Text style={styles.button}>Doğru Cevabı Gör</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    textAlign: "left",
    color: "blue",
    fontWeight: "bold",
    fontSize: 30,
    marginHorizontal: 10,
    marginVertical: 20,
  },
  textButton: {
    backgroundColor: "green",

    marginHorizontal: 20,
    marginVertical: 10,
    padding: 15,
    borderRadius: 20,
  },
  button: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  pressed: {
    opacity: 0.5,
  },
});
