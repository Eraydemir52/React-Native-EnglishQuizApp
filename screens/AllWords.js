import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Words from "../components/Words";
import { WordsContext } from "../store/wordContext";
import { getWords } from "../help/http";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorText from "../components/ErrorText";
import { AuthContext } from "../store/auth-context";

export default function AllWords() {
  const wordsContext = useContext(WordsContext);
  const authContext = useContext(AuthContext);
  const userId = authContext.userId; // userId doğrudan context'ten alındı
  const token = authContext.token;
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    async function takeWords() {
      setError(null);
      setIsFetching(true);
      try {
        const words = await getWords(userId); // userId ile kelimeleri çek
        console.log(words);
        wordsContext.setWords(words); // setWords çağrısını sadece words ile yap
        console.log("Words Context:", wordsContext.words); // Context verisini kontrol etmek için
      } catch (error) {
        setError("Kursları Çekemedik");
      } finally {
        setIsFetching(false);
      }
    }

    takeWords();
  }, [userId, token]);
  console.log("Tüm kelimeler:", JSON.stringify(wordsContext.words));

  if (error && !isFetching) {
    return <ErrorText message={error} />;
  }

  if (isFetching) {
    return <LoadingSpinner />;
  }

  return (
    <View>
      {wordsContext.words.length === 0 ? (
        <Text style={styles.text}>Herhangi bir kelimeniz bulunmamaktadır </Text>
      ) : (
        <Words kelimeler={wordsContext.words} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    marginTop: 50,
    alignSelf: "center",
  },
});
