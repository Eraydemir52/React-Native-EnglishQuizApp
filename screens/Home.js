import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

import WordList from "../components/WordList";
import Filter from "../components/Filter";
import Button from "../components/Button";
import Words from "../components/Words";
import LastWeekWord from "./LastWeekWord";
import AllWords from "./AllWords";
import LastMonthWord from "./LastMonthWord";
import { useNavigation } from "@react-navigation/native";

export default function Home({ route }) {
  const [value, setValue] = useState("Hepsi");
  const navigation = useNavigation();
  const score = route.params?.score || 0;
  console.log("Home value:", value); // İlk render'da bu 'Hepsi' olmalı
  // useEffect(() => {
  //   navigation.setOptions({
  //     headerLeft: () => (
  //       <Text style={styles.headerTitle}>Başarı: %{score}</Text>
  //     ),
  //   });
  // }, [navigation, score]);
  function quizHandler() {
    navigation.navigate("Quiz");
  }
  return (
    <View style={styles.container}>
      <View style={styles.filter}>
        <Filter value={value} setValue={setValue} />
        <Button textButton="Quiz Yap" onPress={quizHandler} />
      </View>
      <View style={styles.WordList}>
        {value === "Hepsi" && <AllWords />}
        {value === "Son 1 Hafta" && <LastWeekWord />}
        {value === "Son 1 Ay" && <LastMonthWord />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  filter: {
    zIndex: 1, // Filter'ın ön planda kalmasını sağlar
    flexDirection: "row",
  },
  WordList: {
    flex: 1, // WordList'in ekranın geri kalanını doldurmasını sağlar
  },
  headerTitle: {
    color: "white",
    fontSize: 15,
  },
});
