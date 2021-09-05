import 'react-native-gesture-handler'; // This import should ALWAYS be first or else app might crash in prod
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faHome, faPlay, faPlayCircle, faSearch, faStar } from '@fortawesome/free-solid-svg-icons';
import { NavigationContainer } from '@react-navigation/native';
import * as Font from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import BottomNavBar from './src/components/navigation/BottomNavBar';
import { colors } from 'styles/styles.js';

export default function App() {
	const [isLoaded, setIsLoaded] = useState(false);

	/**
	 * Add font awesome icons to this library
	 * so that they may be resused in different
	 * components throughout the app
	 */
	library.add(fab, faPlay, faStar, faHome, faSearch, faPlayCircle);

	// Load custom fonts
	useEffect(() => {
		Font.loadAsync({
			'poppins-regular': require('./src/assets/fonts/Poppins-Regular.ttf'),
			'poppins-medium': require('./src/assets/fonts/Poppins-Medium.ttf'),
			'poppins-semiBold': require('./src/assets/fonts/Poppins-SemiBold.ttf'),
		})
			.then(() => setIsLoaded(true))
			.catch(er => console.error(er))
			.finally(() => setIsLoaded(true));
	}, []);

	if (!isLoaded) {
		return <Text style={styles.loading}>Loading...</Text>;
	}

	return (
		<NavigationContainer>
			<StatusBar style="light" backgroundColor="#000" />
			<BottomNavBar />
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	loading: {
		justifyContent: 'center',
		alignSelf: 'center',
		color: '#000',
		fontSize: 20,
		top: '50%',
	},
});
