import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet } from 'react-native';
import { colors } from 'styles/styles.js';
import { DiscoverScreenStack, HomeScreenStack, SearchScreenStack } from './ScreensNavigation';

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
				name="HomeScreen"
				component={HomeScreenStack}
				options={{
					tabBarIcon: ({ focused }) => renderTabIcon('home', focused),
				}}
			/>
			<Screen
				name="SearchScreen"
				component={SearchScreenStack}
				options={{
					tabBarIcon: ({ focused }) => renderTabIcon('search', focused),
				}}
			/>
			<Screen
				name="DiscoverScreen"
				component={DiscoverScreenStack}
				options={{
					tabBarIcon: ({ focused }) => renderTabIcon('film', focused),
				}}
			/>
		</Navigator>
	);
};

const styles = StyleSheet.create({
	tabStyle: {
		backgroundColor: `${colors.navbar}`,
		height: 60,
		borderTopColor: `transparent`,
	},
});

export default BottomNavBar;
