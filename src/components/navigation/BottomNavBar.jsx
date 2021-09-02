import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from 'screens/HomeScreen';
import SearchScreen from 'screens/SearchScreen';
import TrailersScreen from 'screens/TrailersScreen';
import { colors } from 'styles/styles.js';
import { StyleSheet } from 'react-native';

const { Navigator, Screen } = createBottomTabNavigator();

const BottomNavBar = () => {
	return (
		<Navigator backBehavior={'history'} screenOptions={{ tabBarShowLabel: false, tabBarStyle: styles.tabStyle }}>
			<Screen name="Home" component={HomeScreen} />
			<Screen name="Search" component={SearchScreen} />
			<Screen name="Trailers" component={TrailersScreen} />
		</Navigator>
	);
};

const styles = StyleSheet.create({
	tabStyle: {
		position: 'absolute',
		bottom: 5,
		left: 10,
		right: 10,
		elevation: 0,
		backgroundColor: `${colors.primaryBg}`,
		height: 80,
		borderRadius: 10,
	},
});

export default BottomNavBar;
