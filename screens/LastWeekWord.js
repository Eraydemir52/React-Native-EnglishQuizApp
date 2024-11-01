import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Words from "../components/Words";
// Doğru yolu kontrol edin
import { getFilterDate } from "../help/date";
import { WordsContext } from "../store/wordContext";
import LoadingSpinner from "../components/LoadingSpinner";

export default function LastWeekWord() {
  const { words } = useContext(WordsContext); // setWords'a ihtiyaç yoksa kaldırdık
  const [filteredWords, setFilteredWords] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    async function takeWord() {
      setError(null);
      setIsFetching(true);
      try {
        const today = new Date();
        const dateLastWeek = getFilterDate(today, 7);

        const recentWords = words.filter((word) => {
          const wordDate = new Date(word.date);
          return wordDate >= dateLastWeek && wordDate <= today;
        });
        setFilteredWords(recentWords);
      } catch (error) {
        setError("Kurslarım çekemedik !");
      }
      setIsFetching(false);
    }
    takeWord();
  }, [words]);

  if (error && !isFetching) {
    return <ErrorText message={error} />;
  }
  if (isFetching) {
    return <LoadingSpinner />;
  }

  return <Words kelimeler={filteredWords} />;
}

const styles = StyleSheet.create({});
