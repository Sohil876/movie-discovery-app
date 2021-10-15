// This file contains the methods that allow the user
// to add items to their favorites, watch list and add reminders
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from 'react-native';

export const FAVORITE_MOVIES_KEY = 'FAVORITE_MOVIES';
export const FAVORITE_TV_SHOWS_KEY = 'FAVORITE_TV_SHOWS';

/**
 * Add movie to favorites
 * @param {} object value to store in local storage
 */
export const addToFavoriteMovies = async object => {
	try {
		const objectJSON = JSON.stringify(object);

		const favoriteMoviesArr = await AsyncStorage.getItem(FAVORITE_MOVIES_KEY);

		if (!favoriteMoviesArr || !favoriteMoviesArr.length) {
			// create new array and add movie item to local storage
			const movies = JSON.stringify([objectJSON]);

			await AsyncStorage.setItem(FAVORITE_MOVIES_KEY, movies, () => {
				ToastAndroid.showWithGravity(
					'Added to favorites!',
					ToastAndroid.SHORT,
					ToastAndroid.BOTTOM
				);
			});
		} else {
			// add new movie to existing favorites
			const parsedArr = JSON.parse(favoriteMoviesArr);
			const newFavMoviesArr = JSON.stringify([...parsedArr, objectJSON]);

			await AsyncStorage.setItem(FAVORITE_MOVIES_KEY, newFavMoviesArr, () => {
				ToastAndroid.showWithGravity(
					'Added to favorites!',
					ToastAndroid.SHORT,
					ToastAndroid.BOTTOM
				);
			});
		}
	} catch (err) {
		console.log(err);
		throw new Error(err.message);
	}
};

const randomMovie = {
	adult: false,
	backdrop_path: '/owraiceOKtSOa3t8sp3wA9K2Ox6.jpg',
	genre_ids: [16, 28, 12, 878],
	id: 703771,
	original_language: 'en',
	original_title: 'Deathstroke: Knights & Dragons - The Movie',
	overview:
		'The assassin Deathstroke tries to save his family from the wrath of H.I.V.E. and the murderous Jackal.',
	popularity: 2055.471,
	poster_path: '/vFIHbiy55smzi50RmF8LQjmpGcx.jpg',
	release_date: '2020-08-04',
	title: 'Deathstroke: Knights & Dragons - The Movie',
	video: false,
	vote_average: 6.9,
	vote_count: 268,
};

addToFavoriteMovies(randomMovie);
