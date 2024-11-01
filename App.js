import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, View, useNavigation } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import AntDesign from "@expo/vector-icons/AntDesign";
import ManageWord from "./screens/ManageWord";
import Quiz from "./screens/Quiz";
import WordContextProvider from "./store/wordContext";
import LoginScreen from "./authScreens/LoginScreen";
import { useContext } from "react";
import SignupScreen from "./authScreens/SignupScreen";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContent from "./components/DrawerContent";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
function DrawerNavigator() {
  const authContext = useContext(AuthContext); //log aout için
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: "blue",
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={({ navigation }) => ({
          title: "Kelime Listesi",
          headerRight: () => (
            <AntDesign
              name="plus"
              size={30}
              color="white"
              style={{ marginRight: 5 }}
              onPress={() => navigation.navigate("ManageWord")}
            />
          ),
          headerLeft: () => (
            <Pressable onPress={() => navigation.openDrawer()}>
              <Ionicons
                name="menu"
                size={30}
                color="white"
                style={{ marginLeft: 10 }}
              />
            </Pressable>
          ),
        })}
      />
      <Drawer.Screen name="Quiz" component={Quiz} />
    </Drawer.Navigator>
  );
}
function NormalStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: "blue",
        },
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: "Giriş Sayfası" }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ title: "Kayıt Sayfası" }}
      />
    </Stack.Navigator>
  );
}
function AfterAuthenticatedStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: "blue",
        },
      }}
    >
      <Stack.Screen
        name="Drawer"
        component={DrawerNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={({ navigation }) => ({
          title: "Kelime Listesi",
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: "blue",
          },
          headerRight: () => (
            <AntDesign
              name="plus"
              size={24}
              color="white"
              onPress={() => navigation.navigate("ManageWord")} // İkona tıklayınca Quiz ekranına yönlendirme
            />
          ),

          // headerLeft: ({ tintColor }) => (
          //   <Pressable
          //     style={({ pressed }) => pressed && styles.pressed}
          //     onPress={authContext.logout}
          //   >
          //     <Ionicons name="exit" size={24} color={tintColor} />
          //   </Pressable>
          // ),
        })}
      />

      <Stack.Screen
        name="ManageWord"
        component={ManageWord}
        options={{ title: "Kelime Ekle" }}
      />
      <Stack.Screen name="Quiz" component={Quiz} />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authContext = useContext(AuthContext);
  return (
    <NavigationContainer>
      {!authContext.isAuthenticated && <NormalStack />}
      {authContext.isAuthenticated && <AfterAuthenticatedStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthContextProvider>
      <WordContextProvider>
        <Navigation />
      </WordContextProvider>
    </AuthContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
