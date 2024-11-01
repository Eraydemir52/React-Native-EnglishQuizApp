import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

import Button from "../components/Button";
import InputWord from "./InputWord";

export default function WordForm({
  buttonLabel,
  cancelHandler,
  defaultValues,
  onSubmit,
}) {
  const [inputs, setInputs] = useState({
    ingilizcekelime: {
      value: defaultValues ? defaultValues.ingilizcekelime : "",
      isValid: true,
    },
    turkcekelime: {
      value: defaultValues ? defaultValues.turkcekelime : "",
      isValid: true,
    },
  });

  function addorupdateHandler() {
    const today = new Date().toISOString().split("T")[0];
    const wordData = {
      ingilizcekelime: inputs.ingilizcekelime.value,
      turkcekelime: inputs.turkcekelime.value,
      date: today,
    };
    console.log(wordData);
    const ingilizcekelimeIsValid = wordData.ingilizcekelime.trim().length > 0;
    const turkcekelimeIsValid = wordData.turkcekelime.trim().length > 0;
    const dateIsValid = wordData.date.toString() !== "Invalid Date"; //tarihdışında bir şey girdiğinde Invalid date döner odurumuu valid ettik

    if (!ingilizcekelimeIsValid || !turkcekelimeIsValid || !dateIsValid) {
      setInputs((currentInputs) => {
        return {
          ingilizcekelime: {
            value: currentInputs.ingilizcekelime.value,
            isValid: ingilizcekelimeIsValid,
          },
          turkcekelime: {
            value: currentInputs.turkcekelime.value,
            isValid: turkcekelimeIsValid,
          },
        };
      });
      return;
    }

    onSubmit(wordData);
  }
  console.log(inputs);
  function inputChange(inputIdentifier, enterdValue) {
    setInputs((currentInput) => {
      return {
        ...currentInput,
        [inputIdentifier]: { value: enterdValue, isValid: true },
      };
    });
  }
  return (
    <View>
      <InputWord
        text="İngilizce Kelime "
        inValid={!inputs.ingilizcekelime.isValid}
        textInputConfig={{
          value: inputs.ingilizcekelime.value,
          onChangeText: inputChange.bind(this, "ingilizcekelime"),
          value: inputs.ingilizcekelime.value,
        }}
      />
      <InputWord
        text="Türkçe Kelime "
        inValid={!inputs.turkcekelime.isValid} //hata aldığı durumda true
        textInputConfig={{
          onChangeText: inputChange.bind(this, "turkcekelime"),
          value: inputs.turkcekelime.value,
        }}
      />
      <View style={styles.error}>
        {!inputs.ingilizcekelime.isValid && (
          <Text>Lütfen ingilizce kelimeyi giriniz</Text>
        )}
        {!inputs.turkcekelime.isValid && (
          <Text>Lütfen türkçe kelimeyi giriniz</Text>
        )}
      </View>
      <Button textButton={buttonLabel} onPress={addorupdateHandler} />
      <Pressable onPress={cancelHandler}>
        <View style={styles.cancel}>
          <Text style={styles.cancelText}>İptal Et</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  cancel: {
    backgroundColor: "red",
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 20,
  },
  cancelText: {
    fontWeight: "bold",
    color: "white",
    fontSize: 16,
  },
  error: {
    alignItems: "center",
    marginBottom: 10,
  },
});
