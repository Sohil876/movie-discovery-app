import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from 'screens/HomeScreen';
import SearchScreen from 'screens/SearchScreen';
import TrailersScreen from 'screens/TrailersScreen';
import { colors } from 'styles/styles.js';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import MediaDetailsScreen from 'screens/MediaDetailsScreen';
import { HomeScreenStack, SearchScreenStack, TrailersScreenStack } from './ScreensNavigation';

const { Navigator, Screen } = createBottomTabNavigator();

const renderTabIcon = (title, focused) => {
	return (
		<FontAwesomeIcon
			/**prettier-ignore */
			icon={title}
			color={focused ? `${colors.primaryClr}` : `${colors.offWhite}`}
			size={20}
		/>
	);
};

const BottomNavBar = () => {
	return (
		<Navigator
			backBehavior={'history'}
			screenOptions={{
				tabBarShowLabel: false,
				tabBarStyle: styles.tabStyle,
				tabBarHideOnKeyboard: true,
				headerShown: false,
			}}
		>
			<Screen
				name="Home"
				component={HomeScreenStack}
				options={{
					tabBarIcon: ({ focused }) => renderTabIcon('home', focused),
				}}
			/>
			<Screen
				name="Search"
				component={SearchScreenStack}
				options={{
					tabBarIcon: ({ focused }) => renderTabIcon('search', focused),
				}}
			/>
			<Screen
				name="Trailers"
				component={TrailersScreenStack}
				options={{
					tabBarIcon: ({ focused }) => renderTabIcon('play-circle', focused),
				}}
			/>
		</Navigator>
	);
};

const styles = StyleSheet.create({
	tabStyle: {
		// position: 'absolute',
		// bottom: 5,
		// left: 10,
		// right: 10,
		// elevation: 0,
		// borderRadius: 10,
		backgroundColor: `${colors.primaryBg}`,
		height: 60,
		shadowColor: '#000',
		shadowOpacity: 0.25,
		shadowRadius: 3.5,
		elevation: 5,
		shadowOffset: {
			width: 0,
			height: 10,
		},
	},
});

export default BottomNavBar;
