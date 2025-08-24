import { Stack } from "expo-router";

export default function Layout() {
	return (
		<Stack
			screenOptions={{
				headerStyle: {
					backgroundColor: "#f4511e",
				},
				headerTintColor: "#fff",
				headerShown: false,
				headerTitleStyle: {
					fontWeight: "bold",
				},
				animation: "slide_from_right",
			}}
		>
			{/* Optionally configure static options outside the route.*/}
			{/* <Stack.Screen name="login" options={{}} />
         <Stack.Screen name="home" options={{}} /> */}
		</Stack>
	);
}
