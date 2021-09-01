import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from 'screens/HomeScreen';

const { Navigator, Screen } = createBottomTabNavigator();

const Tabs = () => {
	return (
		<Navigator>
			<Screen name="Home" component={HomeScreen} />
		</Navigator>
	);
};

export default Tabs;
