import { createStackNavigator } from '@react-navigation/stack';
import React, { useRef } from 'react';
import MediaDetailsScreen from '../../screens/MediaDetailsScreen';
import HomeScreen from './../../screens/HomeScreen';
import SearchScreen from './../../screens/SearchScreen';
import TrailersScreen from './../../screens/TrailersScreen';
import VideosScreen from './../../screens/VideosScreen';
import { colors } from 'styles/styles.js';
import { View } from 'react-native';

const Home = createStackNavigator();
const Search = createStackNavigator();
const Trailers = createStackNavigator();

export const HomeScreenStack = () => (
	<Home.Navigator
		screenOptions={{
			// gestureEnabled: true,
			// gestureDirection: 'horizontal',
			headerTitleStyle: {
				fontFamily: 'poppins-regular',
				fontSize: 18,
				marginTop: 5,
				color: '#fff',
			},
			headerTransparent: true,
			headerBackground: () => (
				<View style={{ backgroundColor: '#161b4770', color: '#fff', height: 80, width: '100%' }} />
			),
		}}
	>
		<Home.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
		<Home.Screen name="MediaDetails" component={MediaDetailsScreen} options={{ title: 'Back' }} />
		<Home.Screen name="Videos" component={VideosScreen} />
	</Home.Navigator>
);

export const SearchScreenStack = () => (
	<Search.Navigator screenOptions={{ headerShown: false }}>
		<Search.Screen name="Search" component={SearchScreen} />
	</Search.Navigator>
);

export const TrailersScreenStack = () => (
	<Trailers.Navigator screenOptions={{ headerShown: false }}>
		<Trailers.Screen name="Trailers" component={TrailersScreen} />
	</Trailers.Navigator>
);
