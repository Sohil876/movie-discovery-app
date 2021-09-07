import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { View } from 'react-native';
import MediaDetailsScreen from '../../screens/MediaDetailsScreen';
import HomeScreen from './../../screens/HomeScreen';
import MediaListScreen from './../../screens/MediaListScreen';
import SearchScreen from './../../screens/SearchScreen';
import TrailersScreen from './../../screens/TrailersScreen';
import VideosScreen from './../../screens/VideosScreen';

const Home = createStackNavigator();
const Search = createStackNavigator();
const Trailers = createStackNavigator();

const options = {
	mainOptions: {
		gestureEnabled: true,
		gestureDirection: 'horizontal',

		headerTitleStyle: {
			fontFamily: 'poppins-regular',
			fontSize: 18,
			marginTop: 5,
			color: '#fff',
		},

		title: false,
		headerTransparent: true,

		// custom back btn
		headerBackImage: () => (
			<FontAwesomeIcon icon="arrow-circle-left" color="#fff" style={{ marginLeft: 5 }} size={25} />
		),

		headerBackground: () => (
			<View
				style={{
					backgroundColor: '#0b0d24d1',
					color: '#fff',
					height: 45,
					width: 45,
					borderRadius: 100,
					top: 30,
					left: 6,
				}}
			/>
		),
	},
};

export const HomeScreenStack = () => (
	<Home.Navigator screenOptions={options.mainOptions}>
		<Home.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
		<Home.Screen name="MediaDetails" component={MediaDetailsScreen} />
		<Home.Screen name="MediaList" component={MediaListScreen} />
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
