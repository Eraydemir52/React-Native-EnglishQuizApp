import axios from "axios";
import { auth } from "../help/firebase.js";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from "expo-auth-session";

const API_KEY = "AIzaSyCBZ7t2R_ROj4oBdinOArELzX5LmBNhA7Q";
//cevap gelene kadar patlamaması için async yapıyoruz
async function authenticate(mode, email, password) {
  const response = await axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`,
    {
      email: email,
      password: password,
      returnSecureToken: true,
    }
  );
  console.log("Full Response:", response); // Tüm yanıtı görmek için

  //   console.log(response.data);
  const token = response.data.idToken;
  const userId = response.data.localId;
  return { token, userId };
}

export function createUser(email, password) {
  return authenticate("signUp", email, password);
}

export function login(email, password) {
  return authenticate("signInWithPassword", email, password);
}

// export async function signInWithGoogle() {
//   const [request, response, promptAsync] = Google.useAuthRequest({
//     clientId:
//       "396882851586-brtbcdusa0pcjmobjrqtncteqc6qdqg.apps.googleusercontent.com", // Kendi Client ID'nizi buraya ekleyin
//   });

//   // Giriş ekranını göstermek için promptAsync'i çağırın
//   await promptAsync();

//   if (response?.type === "success") {
//     const { id_token } = response.params;
//     const credential = GoogleAuthProvider.credential(id_token);
//     const userCredential = await signInWithCredential(auth, credential);
//     const token = await userCredential.user.getIdToken();
//     const userId = userCredential.user.uid;
//     return { token, userId };
//   } else {
//     console.log("Google Giriş Hatası:", response);
//     throw new Error("Google ile giriş yapılamadı");
//   }
// }
