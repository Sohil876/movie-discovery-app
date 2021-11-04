// This file contains the methods that allow the user
// to add items to their favorites, watch list and add reminders
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from 'react-native';

export const FAVORITE_MOVIES_KEY = 'FAVORITE_MOVIES';
export const FAVORITE_TV_SHOWS_KEY = 'FAVORITE_TV_SHOWS';

/**
 * Check if movie belo
 * @param {*} object
 */

/**
 * Add movie to favorites
 * @param {} object value to store in local storage
 */
export const addToFavorites = async (object, type) => {
	const mediaType = type === 'movie' ? FAVORITE_MOVIES_KEY : FAVORITE_TV_SHOWS_KEY;
	alert(mediaType);

	try {
		const objectJSON = JSON.stringify(object);

		const favoritesArr = await AsyncStorage.getItem(mediaType);

		if (!favoritesArr || !favoritesArr.length) {
			// create new array and add movie item to local storage
			const movies = JSON.stringify([objectJSON]);

			await AsyncStorage.setItem(mediaType, movies, () => {
				ToastAndroid.showWithGravity(
					'Added to favorites!',
					ToastAndroid.SHORT,
					ToastAndroid.BOTTOM
				);
			});
		} else {
			// add new movie to existing favorites
			const parsedArr = JSON.parse(favoritesArr);
			const newFavoritesArr = JSON.stringify([...parsedArr, objectJSON]);

			await AsyncStorage.setItem(mediaType, newFavoritesArr, () => {
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
