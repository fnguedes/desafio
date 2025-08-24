import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import FieldButton from "../components/FieldButton";

export default function Home() {
	const { token } = useLocalSearchParams<{ token: string }>();
	const [user, setUser] = useState<any>(null);

	useEffect(() => {
		let intervalId: NodeJS.Timeout;

		const fetchUser = async () => {
			try {
				console.log("TELA HOME", token);
				const response = await fetch("https://api-dev.boraup.com.br/users/me", {
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					method: "GET",
				});

				const userData = await response.json();
				console.log("USER DATA", userData);
				setUser(userData);
			} catch (error) {
				console.error("Erro ao buscar usuário:", error);
			}
		};

		if (token) {
			// chama imediatamente ao montar
			fetchUser();

			// e agenda atualização a cada 5s
			intervalId = setInterval(fetchUser, 5000);
		}

		// cleanup pra não ficar com interval rodando quando desmontar
		return () => {
			if (intervalId) clearInterval(intervalId);
		};
	}, [token]);

	if (!user) return <Text>Carregando dados do usuário...</Text>;

	return (
		<View style={styles.container}>
			<View style={styles.containerTitle}>
				<Text style={{ color: "#FF641A", fontSize: 22, fontWeight: "bold" }}>
					Bem-vindo, {user?.name ? user?.name : ""}!
				</Text>
			</View>

			<Text style={{ color: "#fff", fontSize: 12 }}>
				Seja muito bem-vindo! Aqui você encontra suas informações principais.{" "}
				<Text style={{ color: "#FF641A", textDecorationLine: "underline" }}>
					Ao clicar nos botões abaixo
				</Text>
				, poderá visualizar cada detalhe de forma organizada, um de cada vez.
			</Text>

			<View style={styles.containerSubTitle}>
				<Text style={{ color: "#FF641A", fontSize: 16, fontWeight: "500" }}>
					Seus dados pessoais
				</Text>
				<View
					style={{ height: 1, width: "100%", backgroundColor: "#FF641A" }}
				/>
			</View>

			<View style={styles.containerData}>
				<FieldButton fieldName="Endereço" field={user.address} />
				<FieldButton fieldName="Tipo" field={user.userType} />
				<FieldButton
					fieldName="Data de Nascimento"
					field={user.birthday}
					fullWidth={true}
				/>
			</View>

			<View style={styles.containerSubTitle}>
				<Text style={{ color: "#FF641A", fontSize: 16, fontWeight: "500" }}>
					Seus dados de contato
				</Text>
				<View
					style={{ height: 1, width: "100%", backgroundColor: "#FF641A" }}
				/>
			</View>

			<View style={styles.containerData}>
				<FieldButton fieldName="Email" field={user.email} />
				<FieldButton fieldName="Telefone" field={user.phone} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#011b1d",
		alignItems: "center",
		justifyContent: "flex-start",
		padding: 20,
		paddingTop: 80,
	},
	text: {
		color: "#fff",
	},
	containerText: {
		backgroundColor: "#013135",
		paddingVertical: 15,
		paddingLeft: 10,
		borderRadius: 20,
		width: "45%",
	},
	containerTitle: {
		width: "100%",
		marginBottom: 20,
	},
	containerSubTitle: {
		width: "100%",
		marginBottom: 30,
		marginTop: 50,
	},
	containerData: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
		alignItems: "center",
		width: "100%",
	},
});
