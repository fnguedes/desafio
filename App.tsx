import { useState } from "react";
import {
	ActivityIndicator,
	Button,
	Dimensions,
	Modal,
	StatusBar,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	Image,
} from "react-native";
import ModalResponseLogin from "./src/components/ModalResponseLogin";

const { width } = Dimensions.get("screen");

export default function App() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);

	const [errorModalVisible, setErrorModalVisible] = useState(false);

	async function handleLogin() {
		// Simulação de login
		setLoading(true);
		const loginOk = await fetch("https://api-dev.boraup.com.br/auth/login", {
			headers: {
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify({
				email: "fellipe@email.com",
				password: "fellipe@123",
			}),
		});
		const loginData = await loginOk.json();
		console.log(loginData);

		if (!loginOk.ok) {
			// Exibir modal de erro
			setErrorModalVisible(true);
			setTimeout(() => {
				setErrorModalVisible(false);
			}, 2000);
		}
		setLoading(false);
	}

	return (
		<View style={styles.container}>
			<StatusBar
				barStyle={"light-content"}
				backgroundColor={"#fff"}
				translucent
			/>
			<Image
				source={require("./assets/logo.png")}
				style={{ width: 150, height: 150, marginBottom: 50 }}
			/>
			<View style={{ width: width * 0.75 }}>
				<Text style={styles.textLabel}>E-mail</Text>
			</View>
			<TextInput style={styles.textInput} maxLength={50} />

			<View style={{ width: width * 0.75 }}>
				<Text style={styles.textLabel}>Senha</Text>
			</View>
			<TextInput
				secureTextEntry={!showPassword}
				style={styles.textInput}
				maxLength={30}
			/>

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
});
