import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Animated,
} from "react-native";
import React, { useRef, useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function FieldButton({
	field,
	fieldName,
	fullWidth = false,
}: {
	field: any;
	fieldName: string;
	fullWidth?: boolean;
}) {
	const heightAnim = useRef(new Animated.Value(0)).current; // escala
	const fadeAnim = useRef(new Animated.Value(0)).current;
	const marginAnim = useRef(new Animated.Value(0)).current;
	const rotateAnim = useRef(new Animated.Value(0)).current;

	const [opening, setOpening] = useState(false);

	const handlePress = () => {
		!opening
			? Animated.parallel([
					// Aumenta
					Animated.timing(heightAnim, {
						toValue: 30,
						duration: 150,
						useNativeDriver: false,
					}),
					Animated.timing(marginAnim, {
						toValue: 15,
						duration: 150,
						useNativeDriver: false,
					}),
					Animated.timing(fadeAnim, {
						toValue: 1,
						duration: 300,
						useNativeDriver: false,
					}),
					Animated.timing(rotateAnim, {
						toValue: 1,
						duration: 300,
						useNativeDriver: false,
					}),
				]).start(() => {
					fadeAnim.setValue(1);
				})
			: Animated.parallel([
					// Aumenta
					Animated.timing(heightAnim, {
						toValue: 0,
						duration: 150,
						useNativeDriver: false,
					}),
					Animated.timing(marginAnim, {
						toValue: 0,
						duration: 150,
						useNativeDriver: false,
					}),
					Animated.timing(fadeAnim, {
						toValue: 0,
						duration: 300,
						useNativeDriver: false,
					}),
					Animated.timing(rotateAnim, {
						toValue: 0,
						duration: 300,
						useNativeDriver: false,
					}),
				]).start(() => {
					fadeAnim.setValue(1);
				});
		setOpening(!opening);
	};

	const rotate = rotateAnim.interpolate({
		inputRange: [0, 1],
		outputRange: ["0deg", "90deg"],
	});

	return (
		<TouchableOpacity
			style={[styles.container, { width: fullWidth ? "100%" : "45%" }]}
			onPress={handlePress}
			activeOpacity={0.4}
		>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
					paddingHorizontal: 10,
				}}
			>
				<Text style={styles.textMain}>{fieldName}</Text>
				<Animated.View style={{ transform: [{ rotate }] }}>
					<MaterialIcons name="arrow-forward-ios" size={15} color="white" />
				</Animated.View>
			</View>

			<Animated.View
				style={{
					marginTop: marginAnim,
					height: heightAnim,
					overflow: "hidden",
					paddingHorizontal: 10,
				}}
			>
				<Animated.Text style={[styles.text, { opacity: fadeAnim }]}>
					{field ? field : "Desconhecido"}
				</Animated.Text>
			</Animated.View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#013135",
		paddingVertical: 15,
		paddingLeft: 10,
		borderRadius: 20,
		width: "45%",
		marginBottom: 20,
	},
	textMain: {
		width: "60%",
		color: "#fff",
	},
	text: {
		color: "#fff",
	},
});
