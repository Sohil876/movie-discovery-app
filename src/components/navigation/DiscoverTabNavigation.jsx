import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { MovieDiscoverTab, TVDiscoverTab } from 'screens/discover/DiscoverTabs';
import { colors } from 'styles/styles.js';
import { Dimensions, Text } from 'react-native';
import { BaseText } from 'components/layout/BaseComponents';

const Discover = createMaterialTopTabNavigator();

const DiscoverTabNavigation = () => {
	return (
		<Discover.Navigator
			screenOptions={styles.screenOptions}
			initialLayout={{ width: Dimensions.get('window').width }}
			sceneContainerStyle={styles.screenStyle}
		>
			<Discover.Screen
				name="Movies"
				// component={MovieDiscoverTab}
				children={props => <MovieDiscoverTab {...props} />}
				options={{
					tabBarLabel: (focused, color) => (
						<BaseText style={styles.tabBarLabelStyle}>Movies</BaseText>
					),
				}}
			></Discover.Screen>
			<Discover.Screen
				name="TV"
				component={TVDiscoverTab}
				options={{
					tabBarLabel: (focused, color) => (
						<BaseText style={styles.tabBarLabelStyle}>TV Shows</BaseText>
					),
				}}
			/>
		</Discover.Navigator>
	);
};

const styles = {
	screenOptions: {
		tabBarStyle: {
			backgroundColor: colors.primaryBg,
		},
	},
	screenStyle: {
		backgroundColor: colors.primaryBg,
	},
	tabBarLabelStyle: {
		color: '#fff',
		fontSize: 16,
	},
	tabBarLabel: () => {},
};

export default DiscoverTabNavigation;
