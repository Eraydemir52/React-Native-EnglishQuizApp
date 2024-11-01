import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import AuthContent from "../authComponents/AuthContent";
import { AuthContext } from "../store/auth-context";
import { login } from "../help/auth";
import Loading from "../authComponents/Loading";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "../help/firebase";
import * as Google from "expo-auth-session/providers/google";
import { makeRedirectUri } from "expo-auth-session"; // makeRedirectUri'yi içe aktarın

export default function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authContext = useContext(AuthContext);

  // Google Auth Request Hook'u burada tanımlıyoruz
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId:
      "842604371794-svp54bvbqe3ilvm8d7c9s5vkdp9iaf4q.apps.googleusercontent.com",
    redirectUri: "https://auth.expo.io/@eray52/quizenglish", // Manuel olarak sabitle
    scopes: ["profile", "email"],
  });

  console.log(makeRedirectUri({ scheme: "quizenglish" }));

  // Google giriş yanıtını dinliyoruz
  useEffect(() => {
    async function handleGoogleResponse() {
      if (response?.type === "success") {
        const { id_token } = response.params;
        const credential = GoogleAuthProvider.credential(id_token);

        try {
          setIsAuthenticating(true);
          const userCredential = await signInWithCredential(auth, credential);
          const token = await userCredential.user.getIdToken();
          const userId = userCredential.user.uid;
          const email = userCredential.user.email;

          authContext.authenticate(token, userId, email);
        } catch (error) {
          console.log("Google Login Error:", error.message);
          Alert.alert("Google ile giriş yapılamadı!", "Lütfen tekrar deneyin.");
        }
        setIsAuthenticating(false);
      }
    }

    handleGoogleResponse();
  }, [response]);

  async function loginHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const { token, userId } = await login(email, password);
      authContext.authenticate(token, userId, email);
    } catch (error) {
      console.log("Login Error:", error.message || error);
      Alert.alert("Giriş yapılmadı!", "Lütfen bilgilerinizi kontrol ediniz.");
    }
    setIsAuthenticating(false);
  }

  if (isAuthenticating) {
    return <Loading message="Kullanıcı giriş yapıyor..." />;
  }

  return (
    <AuthContent
      isLogin
      onAuthenticate={loginHandler}
      googleLoginHandler={promptAsync} // promptAsync'i doğrudan prop olarak geçiyoruz
    />
  );
}

const styles = StyleSheet.create({});
