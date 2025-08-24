import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
   ActivityIndicator,
   Dimensions,
   Image,
   StatusBar,
   StyleSheet,
   Text,
   TextInput,
   TouchableOpacity,
   View,
} from "react-native";
import ModalResponseLogin from "../components/ModalResponseLogin";

const { width } = Dimensions.get("screen");

export default function Login() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [showPassword, setShowPassword] = useState(false);
   const [loading, setLoading] = useState(false);

   const [errorModalVisible, setErrorModalVisible] = useState(false);

   const storeTokens = useCallback(async (accessToken: string, refreshToken: string) => {
      try {
         await AsyncStorage.setItem("accessToken", accessToken);
         await AsyncStorage.setItem("refreshToken", refreshToken);
      } catch (e) {
         console.log("Erro ao salvar tokens:", e);
      }
   }, []);


   async function handleLogin() {
      try {
         setLoading(true);
         const response = await fetch("https://api-dev.boraup.com.br/auth/login", {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({
               email,
               password,
               // "email": "fellipe@email.com",
               // "password": "fellipe@123"
            }),
         });

         const data = await response.json();
         console.log("LOGIN RESPONSE:", data);

         if (!response.ok) {
            setErrorModalVisible(true);
            setTimeout(() => setErrorModalVisible(false), 2000);
         } else {
            await storeTokens(data.accessToken, data.refreshToken);

            router.push({
               pathname: "/home",
               params: { token: data.accessToken },
            });
         }
      } catch (error) {
         console.log("Erro no login:", error);
      } finally {
         setLoading(false);
      }
   }

   useEffect(() => {
      const getData = async () => {
         try {
            const refreshToken = await AsyncStorage.getItem("refreshToken");
            if (refreshToken) {
               console.log("REFRESH TOKEN LOCAL:", refreshToken);

               const response = await fetch(
                  "https://api-dev.boraup.com.br/auth/sessions/refresh-token",
                  {
                     headers: { "Content-Type": "application/json" },
                     method: "POST",
                     body: JSON.stringify({ refreshToken }),
                  },
               );

               const data = await response.json();
               console.log("REFRESH RESPONSE:", data);

               if (response.ok && data.accessToken) {
                  await storeTokens(data.accessToken, data.refreshToken);
                  router.push({
                     pathname: "/home",
                     params: { token: data.accessToken },
                  });
               } else {
                  console.log("Erro no refresh:", data);
               }
            }
         } catch (error) {
            console.log("Erro ao buscar tokens:", error);
         }
      };

      getData();
   }, [storeTokens]); // ✅ agora o linter não reclama


   return (
      <View style={styles.container}>
         <StatusBar
            barStyle={"light-content"}
            backgroundColor={"#fff"}
            translucent
         />

         <Image
            source={require("../../assets/logo.png")}
            style={{ width: 150, height: 150, marginBottom: 50 }}
         />

         <View style={{ width: width * 0.75 }}>
            <Text style={styles.textLabel}>E-mail</Text>
         </View>
         <TextInput
            style={styles.textInput}
            maxLength={50}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
         />

         <View style={{ width: width * 0.75 }}>
            <Text style={styles.textLabel}>Senha</Text>
         </View>
         <View style={styles.containerTextInput2}>
            <TextInput
               secureTextEntry={!showPassword}
               style={styles.textInput2}
               maxLength={30}
               value={password}
               onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
               {showPassword ? (
                  <MaterialIcons name="visibility" size={24} color="black" />
               ) : (
                  <MaterialIcons name="visibility-off" size={24} color="black" />
               )}
            </TouchableOpacity>
         </View>

         <TouchableOpacity
            activeOpacity={0.7}
            style={styles.button}
            onPress={handleLogin}
         >
            {loading ? (
               <ActivityIndicator size="large" color="white" />
            ) : (
               <Text style={styles.textButton}>Entrar</Text>
            )}
         </TouchableOpacity>

         <ModalResponseLogin
            errorModalVisible={errorModalVisible}
            setErrorModalVisible={setErrorModalVisible}
         />
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#011b1d",
      alignItems: "center",
      justifyContent: "center",
   },
   button: {
      paddingHorizontal: 50,
      paddingVertical: 10,
      borderRadius: 20,
      backgroundColor: "#dd4600",
      justifyContent: "center",
      alignItems: "center",
      borderStartColor: "#dd4600",
      borderEndColor: "#dd4600",
      borderTopColor: "#FF641A",
      borderWidth: 1,
      borderBottomColor: "#c94000",
      marginTop: 50,
      minWidth: 200,
   },
   textButton: { fontSize: 22, fontWeight: "bold", color: "#fff" },
   textLabel: { fontSize: 18, fontWeight: "bold", color: "#fff" },
   textInput: {
      height: 50,
      width: width * 0.75,
      borderRadius: 20,
      backgroundColor: "#fff",
      marginVertical: 20,
      fontSize: 16,
      fontWeight: "700",
      paddingLeft: 20,
   },
   textInput2: {
      height: 50,
      width: "80%",
      borderRadius: 20,
      marginVertical: 20,
      fontSize: 16,
      fontWeight: "700",
      paddingLeft: 20,
   },
   containerTextInput2: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      height: 50,
      width: width * 0.75,
      borderRadius: 20,
      backgroundColor: "#fff",
      marginVertical: 20,
      fontSize: 16,
      fontWeight: "700",
      paddingRight: 20,
   },
});
