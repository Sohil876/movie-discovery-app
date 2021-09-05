import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import MediaDetailsScreen from '../../screens/MediaDetailsScreen';
import HomeScreen from './../../screens/HomeScreen';
import SearchScreen from './../../screens/SearchScreen';
import TrailersScreen from './../../screens/TrailersScreen';
import VideosScreen from './../../screens/VideosScreen';

const HomeStack = createStackNavigator();
const SearchStack = createStackNavigator();
const TrailersStack = createStackNavigator();

export const HomeScreenStack = () => {
	return (
		<HomeStack.Navigator screenOptions={{ headerShown: false }}>
			<HomeStack.Screen name="Home" component={HomeScreen} />
			<HomeStack.Screen name="MediaDetails" component={MediaDetailsScreen} options={{ headerTitle: '' }} />
			<HomeStack.Screen name="Videos" component={VideosScreen} />
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
