import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Words from "../components/Words";

import { getFilterDate } from "../help/date";
import { WordsContext } from "../store/wordContext";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorText from "../components/ErrorText";

export default function LastMonthWord() {
  const { words, setWords } = useContext(WordsContext); // words ve setWords'u context'ten alın
  const [filteredWords, setFilteredWords] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    async function takeWord() {
      setIsFetching(true);
      setError(null);
      try {
        const today = new Date();
        const dateLastMonth = getFilterDate(today, 30);

        // Gelen kelimeleri son bir aya göre filtreleyin
        const recentWords = words.filter((word) => {
          const wordDate = new Date(word.date);
          return wordDate >= dateLastMonth && wordDate <= today;
        });

        setFilteredWords(recentWords);
      } catch (error) {
        setError("Kursları Çekemedik !");
      }

      setIsFetching(false);
    }
    takeWord();
  }, [words]); // words değiştikçe filtreleme işlemi yapılır
  if (error && !isFetching) {
    return <ErrorText message={error} />;
  }
  if (isFetching) {
    return <LoadingSpinner />;
  }

  return <Words kelimeler={filteredWords} />;
}

const styles = StyleSheet.create({});
