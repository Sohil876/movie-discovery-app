import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { View } from 'react-native';
import CastAndCrewScreen from 'screens/CastAndCrewScreen';
import DiscoverScreen from 'screens/discover/DiscoverScreen';
import FilterScreen from 'screens/discover/FilterScreen';
import EpisodeDetailsScreen from 'screens/EpisodeDetailsScreen';
import EpisodeGuideScreen from 'screens/EpisodeGuideScreen';
import HomeScreen from 'screens/HomeScreen';
import MediaDetailsScreen from 'screens/MediaDetailsScreen';
import MediaListScreen from 'screens/MediaListScreen';
import PersonDetailsScreen from 'screens/PersonDetailsScreen';
import SearchScreen from 'screens/SearchScreen';
import WatchVideosScreen from 'screens/WatchVideosScreen';
import { API_KEY } from '../../utils/requests';
import { colors } from 'styles/styles.js';
import UserLibraryScreen from '../../screens/library/UserLibraryScreen';
import FavoritesScreen from '../../screens/library/FavoritesScreen';

const Home = createStackNavigator();
const Search = createStackNavigator();
const Discover = createStackNavigator();
const UserLibrary = createStackNavigator();

export const HomeScreenStack = () => (
	<Home.Navigator screenOptions={options.screenOptions}>
		<Home.Screen name="Home" component={HomeScreen} options={options.noHeader} />
		<Home.Screen name="MediaDetails" component={MediaDetailsScreen} />
		<Home.Screen name="MediaList" children={props => <MediaListScreen {...props} />} />
		<Home.Screen name="WatchVideos" component={WatchVideosScreen} />
		<Home.Screen name="PersonDetails" component={PersonDetailsScreen} />
		<Home.Screen name="CastAndCrew" component={CastAndCrewScreen} />
		<Home.Screen name="EpisodeGuide" component={EpisodeGuideScreen} />
		<Home.Screen name="EpisodeDetails" component={EpisodeDetailsScreen} />
	</Home.Navigator>
);

export const SearchScreenStack = () => (
	<Search.Navigator screenOptions={options.screenOptions}>
		<Search.Screen name="Search" component={SearchScreen} options={options.noHeader} />
		<Search.Screen name="MediaDetails" component={MediaDetailsScreen} />
		<Search.Screen name="MediaList" children={props => <MediaListScreen {...props} />} />
		<Search.Screen name="WatchVideos" component={WatchVideosScreen} />
		<Search.Screen name="PersonDetails" component={PersonDetailsScreen} />
		<Search.Screen name="CastAndCrew" component={CastAndCrewScreen} />
		<Search.Screen name="EpisodeGuide" component={EpisodeGuideScreen} />
		<Search.Screen name="EpisodeDetails" component={EpisodeDetailsScreen} />
	</Search.Navigator>
);

export const DiscoverScreenStack = () => (
	<Discover.Navigator screenOptions={options.screenOptions}>
		<Discover.Screen
			name="Discover"
			initialParams={{ api_key: API_KEY, language: 'en-US' }}
			component={DiscoverScreen}
			options={options.noHeader}
		/>
		<Discover.Screen name="MediaDetails" component={MediaDetailsScreen} />
		<Discover.Screen name="MediaList" children={props => <MediaListScreen {...props} />} />
		<Discover.Screen name="WatchVideos" component={WatchVideosScreen} />
		<Discover.Screen name="PersonDetails" component={PersonDetailsScreen} />
		<Discover.Screen name="CastAndCrew" component={CastAndCrewScreen} />
		<Discover.Screen name="EpisodeGuide" component={EpisodeGuideScreen} />
		<Discover.Screen name="EpisodeDetails" component={EpisodeDetailsScreen} />
		<Discover.Screen name="FilterScreen" component={FilterScreen} />
	</Discover.Navigator>
);

export const UserLibraryScreenStack = () => (
	<UserLibrary.Navigator screenOptions={options.screenOptions}>
		<UserLibrary.Screen name="Library" component={UserLibraryScreen} options={options.noHeader} />
		<UserLibrary.Screen name="Favorites" component={FavoritesScreen} />
		<UserLibrary.Screen name="MediaDetails" component={MediaDetailsScreen} />
		<UserLibrary.Screen name="MediaList" children={props => <MediaListScreen {...props} />} />
		<UserLibrary.Screen name="WatchVideos" component={WatchVideosScreen} />
		<UserLibrary.Screen name="PersonDetails" component={PersonDetailsScreen} />
		<UserLibrary.Screen name="CastAndCrew" component={CastAndCrewScreen} />
		<UserLibrary.Screen name="EpisodeGuide" component={EpisodeGuideScreen} />
		<UserLibrary.Screen name="EpisodeDetails" component={EpisodeDetailsScreen} />
	</UserLibrary.Navigator>
);

const options = {
	screenOptions: {
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
					backgroundColor: '#0000007f',
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
