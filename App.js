import 'intl';
import 'intl/locale-data/jsonp/en';

/**
 * The above imports should ALWAYS appear in that order
 * or the app may crash in prod.
 */
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import {
	faHome,
	faPlay,
	faPlayCircle,
	faSearch,
	faUser,
	faStar,
	faArrowCircleLeft,
	faTimesCircle,
	faFrownOpen,
	faChevronRight,
	faFilm,
	faFilter,
	faHeart,
	faTv,
	faClock,
	faEllipsisV,
} from '@fortawesome/free-solid-svg-icons';
import { NavigationContainer } from '@react-navigation/native';
import * as Font from 'expo-font';
import React, { useEffect, useState } from 'react';
import BottomNavBar from './src/components/navigation/BottomNavBar';
import Loader from 'components/layout/Loader';

export default function App() {
	const [isLoaded, setIsLoaded] = useState(false);

	/**
	 * Add font awesome icons to this library
	 * so that they may be resused in different
	 * components throughout the app
	 */
	library.add(
		fab,
		faPlay,
		faStar,
		faHome,
		faSearch,
		faPlayCircle,
		faChevronRight,
		faArrowCircleLeft,
		faTimesCircle,
		faFrownOpen,
		faFilm,
		faFilter,
		faUser,
		faHeart,
		faTv,
		faClock,
		faEllipsisV
	);

	// Load custom fonts
	useEffect(() => {
		Font.loadAsync({
			'poppins-regular': require('./src/assets/fonts/Poppins-Regular.ttf'),
			'poppins-medium': require('./src/assets/fonts/Poppins-Medium.ttf'),
			'poppins-semiBold': require('./src/assets/fonts/Poppins-SemiBold.ttf'),
			'poppins-italic': require('./src/assets/fonts/Poppins-Italic.ttf'),
		})
			.then(() => setIsLoaded(true))
			.catch(er => console.error(er))
			.finally(() => setIsLoaded(true));
	}, []);

	if (!isLoaded) {
		return <Loader />;
	}

	return (
		<NavigationContainer>
			<BottomNavBar />
		</NavigationContainer>
	);
}
