// firebase.js
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// Firebase yapılandırması
const firebaseConfig = {
  apiKey: "AIzaSyCBZ7t2R_ROj4oBdinOArELzX5LmBNhA7Q",
  authDomain: "englishquiz-5c905.firebaseapp.com",
  databaseURL: "https://englishquiz-5c905-default-rtdb.firebaseio.com",
  projectId: "englishquiz-5c905",
  storageBucket: "englishquiz-5c905.appspot.com",
  messagingSenderId: "842604371794",
  appId: "1:842604371794:web:dd10fac37c10e2e3e9e48b",
  measurementId: "G-WYZMNTYRTW",
};

// Firebase'i başlatın
const app = initializeApp(firebaseConfig);

// Firebase Authentication'i AsyncStorage ile kalıcı oturum desteği ile başlatın
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { auth };
