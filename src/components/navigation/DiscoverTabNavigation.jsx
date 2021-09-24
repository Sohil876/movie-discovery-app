import React from 'react';
import { View, Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Discover = createMaterialTopTabNavigator();

const DiscoverTabNavigation = () => {
	return (
		<Discover.Navigator>
			<Discover.Screen name="Movies" />
			<Discover.Screen name="TV" />
		</Discover.Navigator>
	);
};

export default DiscoverTabNavigation;
