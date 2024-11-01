import { Alert, Pressable, StyleSheet, Text, View, Image } from "react-native";
import React, { useState } from "react";
import AuthForm from "./AuthForm";
import ButtonWhite from "./ButtonWhite";
import { useNavigation } from "@react-navigation/native";

export default function AuthContent({
  isLogin,
  onAuthenticate,
  googleLoginHandler,
}) {
  const navigation = useNavigation();
  const [ceredentialsIsValid, setCeredentialsIsValid] = useState({
    email: false,
    password: false,
    confirmEmail: false,
    confirmPassword: false,
  });

  // input verileri validate etme
  function submitHandler(credentials) {
    let { confirmEmail, confirmPassword, email, password } = credentials;

    email = email.trim();
    password = password.trim();

    const emailIsValid = email.includes("@");
    const passwordIsValid = password.length > 6;
    const emailIsAreEqual = email === confirmEmail;
    const passwordIsAreEqual = password === confirmPassword;

    if (
      !emailIsValid ||
      !passwordIsValid ||
      (!isLogin && (!emailIsAreEqual || !passwordIsAreEqual))
    ) {
      Alert.alert("Lütfen girdiğiniz değerleri kontrol ediniz!");
      setCeredentialsIsValid({
        email: !emailIsValid,
        confirmEmail: !emailIsAreEqual,
        password: !passwordIsValid,
        confirmPassword: !passwordIsAreEqual,
      });
      return;
    }

    // Doğrulama başarılıysa onAuthenticate fonksiyonunu çağır
    onAuthenticate({ email, password });
  }

  function switchScreen() {
    if (isLogin) {
      navigation.navigate("Signup");
    } else {
      navigation.navigate("Login");
    }
  }

  return (
    <View style={[styles.container, !isLogin && styles.containerSignUp]}>
      <AuthForm
        isLogin={isLogin}
        ceredentialsIsValid={ceredentialsIsValid}
        onSubmit={submitHandler}
      />
      <View>
        <Pressable
          onPress={() => {
            if (googleLoginHandler) {
              googleLoginHandler(); // Google giriş fonksiyonunu tetikleme
            } else {
              Alert.alert(
                "Google Login Hatası",
                "Google giriş fonksiyonu tanımlı değil."
              );
            }
          }}
          style={({ pressed }) => [pressed && styles.pressed]}
        >
          <View style={styles.googleIconContainer}>
            <Image
              source={require("../assets/googleicon.png")}
              style={styles.googleIcon}
            />
            <Text
              style={[styles.googleText, { marginLeft: isLogin ? 45 : 60 }]}
            >
              Google İle {isLogin ? "Giriş Yap" : "Kaydol"}
            </Text>
          </View>
        </Pressable>
        <ButtonWhite onPress={switchScreen}>
          {isLogin ? "Yeni Kullanıcı Oluştur" : "Giriş Yap"}
        </ButtonWhite>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "blue",
    marginTop: 100,
    marginHorizontal: 30,
    padding: 15,
    borderRadius: 20,
    elevation: 4,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  containerSignUp: {
    marginTop: 30,
  },
  googleIconContainer: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    marginVertical: 3,
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  googleText: {
    color: "#757575",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
  },
  pressed: {
    opacity: 0.5,
  },
});
