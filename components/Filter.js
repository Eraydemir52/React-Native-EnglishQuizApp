import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";

export default function Filter({ value, setValue }) {
  // value ve setValue'yu prop olarak alıyoruz
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "Hepsi", value: "Hepsi" },
    { label: "Son 1 Hafta", value: "Son 1 Hafta" },
    { label: "Son 1 Ay", value: "Son 1 Ay" },
  ]);

  return (
    <View style={styles.container}>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue} // setValue burada güncelleniyor
        setItems={setItems}
        style={styles.picker}
        dropDownContainerStyle={styles.dropDownContainer}
        textStyle={styles.textStyle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 10,
  },
  dropDownContainer: {
    borderColor: "#ddd",
  },
  textStyle: {
    color: "black",
    fontSize: 14,
    fontWeight: "bold",
  },
});
