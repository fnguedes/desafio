import React from "react";
import { View, Text, Button, Modal, StyleSheet } from "react-native";

interface ModalProps {
	errorModalVisible: boolean;
	setErrorModalVisible: (visible: boolean) => void;
}

export default function ModalResponseLogin({
	errorModalVisible,
	setErrorModalVisible,
}: ModalProps) {
	return (
		<Modal
			visible={errorModalVisible}
			transparent
			animationType="fade"
			onRequestClose={() => setErrorModalVisible(false)}
		>
			<View style={styles.overlay}>
				<View style={styles.modal}>
					<Text style={styles.errorText}>Usuário ou senha inválidos!</Text>
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	overlay: {
		flex: 1,
		// backgroundColor: "rgba(0,0,0,0.4)",
		justifyContent: "flex-end",
		alignItems: "center",
	},
	modal: {
		backgroundColor: "#a00",
		width: "100%",
		paddingVertical: 10,
		paddingHorizontal: 20,
		elevation: 5,
	},
	errorText: {
		color: "white",
		fontWeight: "bold",
		fontSize: 16,
	},
});
