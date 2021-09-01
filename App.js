import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faPlay, faStar } from '@fortawesome/free-solid-svg-icons';
import * as Font from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
	const [isLoaded, setIsLoaded] = useState(false);

	/**
	 * Add font awesome icons to this library
	 * so that they may be resused in different
	 * components throughout the app
	 */
	library.add(fab, faPlay, faStar);

	// Load custom fonts
	useEffect(() => {
		Font.loadAsync({
			'poppins-regular': require('./src/assets/fonts/Poppins-Regular.ttf'),
			'poppins-medium': require('./src/assets/fonts/Poppins-Medium.ttf'),
			'poppins-semiBold': require('./src/assets/fonts/Poppins-SemiBold.ttf'),
		}).then(() => setIsLoaded(true));
	}, []);

	if (!isLoaded) {
		return <Text style={styles.loading}>Loading...</Text>;
	}

	return (
		<NavigationContainer>
			<View style={styles.container}>
				<StatusBar style="light" backgroundColor="#000" />
				<HomeScreen />
			</View>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	loading: {
		justifyContent: 'center',
		alignItems: 'center',
		color: '#000',
		fontSize: 20,
	},
});
