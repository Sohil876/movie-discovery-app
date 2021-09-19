import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { View } from 'react-native';
import MediaDetailsScreen from 'screens/MediaDetailsScreen';
import HomeScreen from 'screens/HomeScreen';
import MediaListScreen from 'screens/MediaListScreen';
import SearchScreen from 'screens/SearchScreen';
import TrailersScreen from 'screens/TrailersScreen';
import WatchVideosScreen from 'screens/WatchVideosScreen';
import PersonDetailsScreen from 'screens/PersonDetailsScreen';
import CastAndCrewScreen from 'screens/CastAndCrewScreen';
import EpisodeGuideScreen from 'screens/EpisodeGuideScreen';

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
	noHeader: {
		headerShown: false,
	},
};

export const HomeScreenStack = () => (
	<Home.Navigator screenOptions={options.mainOptions}>
		<Home.Screen name="Home" component={HomeScreen} options={options.noHeader} />
		<Home.Screen name="MediaDetails" component={MediaDetailsScreen} />
		<Home.Screen name="MediaList" component={MediaListScreen} />
		<Home.Screen name="WatchVideos" component={WatchVideosScreen} />
		<Home.Screen name="PersonDetails" component={PersonDetailsScreen} />
		<Home.Screen name="CastAndCrew" component={CastAndCrewScreen} />
		<Home.Screen name="EpisodeGuide" component={EpisodeGuideScreen} />
	</Home.Navigator>
);

export const SearchScreenStack = () => (
	<Search.Navigator screenOptions={options.mainOptions}>
		<Search.Screen name="Search" component={SearchScreen} options={options.noHeader} />
		<Search.Screen name="MediaDetails" component={MediaDetailsScreen} />
		<Search.Screen name="MediaList" component={MediaListScreen} />
		<Search.Screen name="WatchVideos" component={WatchVideosScreen} />
		<Search.Screen name="PersonDetails" component={PersonDetailsScreen} />
		<Search.Screen name="CastAndCrew" component={CastAndCrewScreen} />
		<Search.Screen name="EpisodeGuide" component={EpisodeGuideScreen} />
	</Search.Navigator>
);

export const TrailersScreenStack = () => (
	<Trailers.Navigator screenOptions={options.mainOptions}>
		<Trailers.Screen name="Trailers" component={TrailersScreen} />
	</Trailers.Navigator>
);
