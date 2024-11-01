import React, { useContext } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import { AuthContext } from "../store/auth-context";
import { WordsContext } from "../store/wordContext";

export default function DrawerContent(props) {
  const authContext = useContext(AuthContext);
  const wordsContext = useContext(WordsContext);

  return (
    <DrawerContentScrollView
      {...props}
      style={{ backgroundColor: "blue" }} // Burada tam ekran için arka plan rengi
      contentContainerStyle={styles.scrollContainer}
    >
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Ionicons name="person-circle-outline" size={50} color="white" />
          <Text style={styles.text}>{authContext.email}</Text>
          <Text style={styles.textScore}>Başarı: %{wordsContext.score}</Text>

          <Pressable
            onPress={authContext.logout}
            style={styles.logoutContainer}
          >
            <Ionicons
              name="exit"
              size={30}
              color="white"
              style={{ marginRight: 10 }}
            />
            <Text style={styles.text}>Çıkış Yap</Text>
          </Pressable>
        </View>

        <View style={styles.drawerContentItems}>
          <Pressable
            style={styles.item}
            onPress={() => props.navigation.navigate("Home")}
          >
            <Feather name="list" size={24} color="white" style={styles.icon} />
            <Text style={styles.itemLabel}>Kelime Listem</Text>
          </Pressable>

          <Pressable
            style={styles.item}
            onPress={() => props.navigation.navigate("Quiz")}
          >
            <Feather name="edit" size={24} color="white" style={styles.icon} />
            <Text style={styles.itemLabel}>Quiz yap</Text>
          </Pressable>
        </View>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  headerContainer: {
    alignItems: "center",
    marginVertical: 13,
  },
  text: {
    color: "white",
    alignSelf: "center",
    marginVertical: 13,
    fontWeight: "bold",
  },
  textScore: {
    color: "white",
    fontWeight: "bold",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginVertical: 5,
    backgroundColor: "rgba(255, 255, 255, 0.2)", // Görsel olarak belirginlik eklemek için
  },
  itemLabel: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
  logoutContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
});
