import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import AuthContent from "../authComponents/AuthContent";
import { AuthContext } from "../store/auth-context";
import { createUser } from "../help/auth";
import Loading from "../authComponents/Loading";

export default function SignupScreen() {
  const [isAuthanticating, setIsAuthanticating] = useState(false);
  const authContext = useContext(AuthContext);
  async function signUpHandler({ email, password }) {
    setIsAuthanticating(true);
    try {
      console.log("Email Or Password: " + email + " " + password);
      const { token, userId } = await createUser(email, password);
      console.log(token);
      authContext.authenticate(token, userId, email);
    } catch (error) {
      console.log(error);
      Alert.alert("Kayıt olunamadı", "Lütfen bilgileriniz kontrol ediniz");
    }
  }
  if (isAuthanticating) {
    return <Loading message="Kullancı oluşturuyor..." />;
  }
  return <AuthContent onAuthenticate={signUpHandler} />;
}

const styles = StyleSheet.create({});
