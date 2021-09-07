/**
 * TMDb API
 * https://developers.themoviedb.org/3/getting-started/introduction
 */

import tmdb from './baseURL';
import { API_KEY } from './requests';

export const months = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];

/**
 * Formats date from '2021-09-11' to 'September 11, 2021'
 * @returns formatted date as string
 */

export const formatDate = date => {
	if (!date) return 'N/A';

	const day = new Date(date).getDate();
	const month = new Date(date).getMonth();
	const year = new Date(date).getFullYear();

	return `${months[month]} ${day}, ${year}`;
};

export const fetchTrailers = () => {
	return {};
};

/**
 * Format number as currency (USD)
 * @returns number formatted in USD (e.g. USD$10,000)
 */

export const formatAsCurrency = num => {
	if (!num) return null;

	const formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	});

	return formatter.format(num);
};

/**
 * Fetch Similar Media
 */

export const fetchSimilar = async (media, type) => {
	try {
		const { data, status, statusText } = await tmdb.get(
			`/${type}/${media.id}/similar?api_key=${API_KEY}&language=en-US&page=1`
		);
		if (status !== 200) throw Error(statusText);

		return data.results;
	} catch (er) {
		console.error(er, 'error fetching similar media');
		throw Error(er);
	}
};

/**
 * Fetch Recommended Media
 *
 * https://developers.themoviedb.org/3/movies/get-movie-recommendations
 */

export const fetchRecommended = async (media, type) => {
	try {
		const { data, status, statusText } = await tmdb.get(
			`/${type}/${media.id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`
		);
		if (status !== 200) throw Error(statusText);

		return data.results;
	} catch (er) {
		console.error(er, 'error fetching recommended media');
		throw Error(er);
	}
};

/**
 * Fetch genre list
 */

export const fetchGenres = async type => {
	// type param can either be 'movie' || 'tv'
	try {
		const { data, status, statusText } = await tmdb.get(`/genre/${type}/list?api_key=${API_KEY}&language=en-US`);
		if (status !== 200) throw Error(statusText);

		return data;
	} catch (er) {
		console.error('error fetching movie genres', er);
	}
};

/**
 * Fetch Media Data
 *
 * @param {string} url url to fetch
 */
export const fetchMediaData = async url => {
	try {
		const { data, status, statusText } = await tmdb.get(url);
		if (status !== 200) throw Error(statusText);

		return data.results;
	} catch (er) {
		console.log(er, `Error fetching media data`);
	}
};

/**
 * Fetch Media Details
 *
 * @param {string} type 'movie' or 'tv'
 *
 * This will also fetch images and videos:
 * See https://developers.themoviedb.org/3/getting-started/append-to-response
 */

export const fetchMediaDetails = async (type, media) => {
	try {
		const { data, status } = await tmdb.get(
			`/${type}/${media.id}?api_key=${API_KEY}&language=en-US&include_image_language=en&append_to_response=videos,images`
		);
		if (status !== 200) throw Error('error fetching media details');
		// console.log(data, 'RUNTIME OBJECT');

		return data;
	} catch (er) {
		console.error(er);
	}
};

/**
 * Calculate media runtime
 */
export const calcMediaRuntime = runtime => {
	if (!runtime) return 'N/A';
	// if runtime is an hour or more
	else if (runtime > 60) {
		const hours = Math.floor(runtime / 60);
		const min = runtime % 60;
		return `${hours}hr ${min}m`;
		// if runtime is less than an hour AND is not 0 mins or less
	} else if (runtime <= 60 && runtime !== 0) {
		return `${runtime} m`;
	}
};

/**
 * Fetch Media Images
 */
export const fetchMediaImages = async (type, media) => {
	try {
		const { data, status, statusText } = await tmdb.get(
			`/${type}/${media.id}/images?api_key=${API_KEY}&include_image_language=en&language=en-US`
		);
		if (status !== 200) throw Error(statusText);
		return data;
	} catch (e) {
		console.error(e);
	}
};

/**
 * Fetch Cast and Crew
 */
export const fetchCredits = async (type, media) => {
	try {
		const { status, data, statusText } = await tmdb.get(
			`/${type}/${media.id}/credits?api_key=${API_KEY}&language=en-US`
		);
		if (status !== 200) throw Error(statusText);
		return data;
	} catch (e) {
		console.error(e, 'error fetching credits data');
	}
};
