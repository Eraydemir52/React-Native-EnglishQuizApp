import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// AuthContext oluşturuluyor
export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  userId: null,
  email: null,
  authenticate: (token, userId, email) => {},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [email, setEmail] = useState(null); // Yeni: email durumu

  // Uygulama başlatıldığında token ve userId'yi AsyncStorage'dan yükle
  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("Token"); // Token'i yükle
      const storedUserId = await AsyncStorage.getItem("UserId"); // UserId'yi yükle
      const storedEmail = await AsyncStorage.getItem("Email");
      if (storedToken && storedUserId && storedEmail) {
        setAuthToken(storedToken);
        setUserId(storedUserId);
        setEmail(storedEmail); // Yeni: Email'i ayarla
      }
    }
    fetchToken();
  }, []);

  // Oturum açıldığında çağrılır
  function authenticate(token, userId, email) {
    setAuthToken(token);
    setUserId(userId);
    setEmail(email); // Yeni: Email'i ayarla
    AsyncStorage.setItem("Token", token); // Token'i AsyncStorage'da sakla
    AsyncStorage.setItem("UserId", userId); // UserId'yi AsyncStorage'da sakla
    AsyncStorage.setItem("Email", email); // Yeni: Email'i AsyncStorage'da sakla
  }

  // Çıkış yapıldığında çağrılır
  function logout() {
    setAuthToken(null);
    setUserId(null);
    setEmail(null); // Yeni: Email'i temizle
    AsyncStorage.removeItem("Token"); // Token'i sil
    AsyncStorage.removeItem("UserId"); // UserId'yi sil
    AsyncStorage.removeItem("Email"); // Yeni: Email'i sil
  }

  // Context değerleri
  const value = {
    token: authToken,
    userId,
    email, // Yeni: Email'i context değerlerine ekledik
    isAuthenticated: !!authToken, // Eğer token varsa true, yoksa false
    authenticate,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
