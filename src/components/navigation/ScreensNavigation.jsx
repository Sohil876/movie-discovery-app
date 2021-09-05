import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './../../screens/HomeScreen';
import SearchScreen from './../../screens/SearchScreen';
import TrailersScreen from './../../screens/TrailersScreen';
import MediaDetailsScreen from '../../screens/MediaDetailsScreen';

const HomeStack = createStackNavigator();
const SearchStack = createStackNavigator();
const TrailersStack = createStackNavigator();

export const HomeScreenStack = () => {
	return (
		<HomeStack.Navigator screenOptions={{ headerShown: false }}>
			<HomeStack.Screen name="Home" component={HomeScreen} />
			<HomeStack.Screen name="MediaDetails" component={MediaDetailsScreen}/>
		</HomeStack.Navigator>
	);
};

export const SearchScreenStack = () => {
	return (
		<SearchStack.Navigator screenOptions={{ headerShown: false }}>
			<SearchStack.Screen name="Search" component={SearchScreen} />
		</SearchStack.Navigator>
	);
};

export const TrailersScreenStack = () => {
	return (
		<TrailersStack.Navigator screenOptions={{ headerShown: false }}>
			<TrailersStack.Screen name="Trailers" component={TrailersScreen} />
		</TrailersStack.Navigator>
	);
};
